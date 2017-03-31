/*
 * Fetch XML per file. A checkout from the whole TEKSTEN dir
 * is about 700 a 800MB.
 */
import { exec } from 'child_process';
import * as fs from 'fs-extra';
import { xmlFiles, inputDir } from '../constants';
import * as readline from 'readline';

const askSvnCreds = async () => {
	const question = (q) => new Promise<string>((resolve, reject) => {
		const rl = readline.createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		rl.question(q, (answer) => {
			resolve(answer);
			rl.close();
		});
	});

	const svnUser = await question('SVN username? ');
	const svnServer = await question('SVN server? ');
	const svnPath = await question('SVN path? ');
	const doubleCheck = await question(`Does this look correct? svn+ssh://${svnUser}@${svnServer}${svnPath} `);

	if (doubleCheck !== '' && doubleCheck.slice(0, 1).toLowerCase() !== 'y') {
		console.log('Please try again...'.red);
		process.exit(0);
	}

	return { svnUser, svnServer, svnPath };
};

const exportXmlFile = (config) => (svnFilePath) =>
	new Promise((resolve, reject) => {
		const { svnUser, svnServer, svnPath } = config;
		const command = `svn export svn+ssh://${svnUser}@${svnServer}${svnPath}${svnFilePath} ${inputDir}`;
		exec(command, (error, stdout, stderr) => {
			if (error) {
				return reject(stderr);
			}

			fs.removeSync(`${inputDir}/.svn`);
			resolve();
		})
	});

export default async () => {
	let config;
	try {
		config = fs.readJsonSync(`${process.cwd()}/config.json`);
	} catch(e) {
		console.log();
		console.log('[ERROR] No SVN credentials found. Care to share?'.red);
		config = await askSvnCreds();
	}

	// Make sure the inputDir exists
	fs.emptyDirSync(inputDir);
	const files = xmlFiles.map((f) => `TEKSTEN/Writings/${f}`);
	await Promise.all(files.map(exportXmlFile(config)))
		.catch((e) => {
			// Remove the inputDir, because transfer has errored
			fs.removeSync(inputDir);
			console.log(e.red);
			process.exit();
		});
}
