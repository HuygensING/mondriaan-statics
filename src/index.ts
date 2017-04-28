import * as fs from 'fs-extra';
import fetch from './fetch';
import generateJsx from './generate-jsx';
import generateSolrInput from './generate-solr-input';
import {xmlDir, entriesDir} from './constants';
const colors = require('colors');

const development = process.env.NODE_ENV === 'development';

const main = async () => {
	// Fetch entries and XML files when not developing
	// or when the xmlDir does not exist
	if (!development || !fs.existsSync(xmlDir))	await fetch();

	// Empty output dir(s)
	fs.emptyDirSync(entriesDir);

	process.stdout.write('* Generate JSX from XML. '.cyan);
	await generateJsx();
	console.log('Done.'.green);

	process.stdout.write('* Generate Solr input from XML. '.cyan);
	await generateSolrInput();
	console.log('Done.'.green);

	// Remove the xmlDir if not developing
	if (!development) fs.removeSync(xmlDir);

	console.log('\nA L L   D O N E ! ! !\n'.rainbow.bold);
};

main();
