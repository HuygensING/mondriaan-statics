import * as fs from 'fs-extra';
import fetch from './fetch';
import generateJsx from './generate-jsx';
import {inputDir, outputDir} from './constants';
const colors = require('colors');

const development = process.env.NODE_ENV === 'development';


const main = async () => {
	// Fetch entries and XML files when not developing
	// or when the inputDir does not exist
	if (!development || !fs.existsSync(inputDir))	await fetch();

	// Empty output dir(s)
	fs.emptyDirSync(outputDir);

	process.stdout.write('* Generate JSX from XML. '.cyan);
	await generateJsx();
	console.log('Done.'.green);

	// Remove the inputDir if not developing
	if (!development) fs.removeSync(inputDir);

	console.log('\nA L L   D O N E ! ! !\n'.rainbow.bold);
};

main();
