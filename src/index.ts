import * as fs from 'fs-extra';
import fetch from './fetch';
import generateJsx from './generate-jsx';
import { outputDir } from './constants';
const colors = require('colors');

const development = process.env.NODE_ENV === 'development';

// Empty output dir(s)
fs.emptyDirSync(outputDir);

const main = async () => {
	// Fetch entries and XML files when not developing
	if (!development)	await fetch();

	process.stdout.write('* Generate JSX from XML. '.cyan);
	await generateJsx();
	console.log('Done.'.green);

	console.log('\nA L L   D O N E ! ! !\n'.rainbow.bold);
};

main();
