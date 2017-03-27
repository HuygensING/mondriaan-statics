/*
 * Fetch XML per file. A checkout from the whole TEKSTEN dir
 * is about 700 a 800MB.
 */
import { exec } from 'child_process';
import * as fs from 'fs-extra';
import { xmlFiles, inputDir } from '../constants';

const { svnUser, svnServer, svnPath } = fs.readJsonSync('./config.json');

const files = xmlFiles.map((f) => `TEKSTEN/Writings/${f}`);

const exportXmlFile = (svnFilePath) => new Promise((resolve, reject) => {
	const xmlOutputPath = `${inputDir}/xml`;
	const command = `svn export svn+ssh://${svnUser}@${svnServer}${svnPath}${svnFilePath} ${xmlOutputPath}`;
	exec(command, (error, stdout, stderr) => {
		if (error) {
			console.log(error);
			return reject();
		}

		fs.removeSync(`${xmlOutputPath}/.svn`);
		resolve();
	})
});

export default async () => {
	fs.emptyDirSync(`${inputDir}/xml`);
	await Promise.all(files.map(exportXmlFile));
}
