import * as fs from 'fs-extra';
import * as path from 'path';
import xml2html from 'hi-xml2html';
import {xmlFiles, inputDir} from "../constants";
import Lb from "./tags/lb";


const postProcess = (xmlPath, state) => {
	const body = state.output
		.replace(/"/g, '\"')
		.replace(/\s\s+/g, ' ');

	return {
		'body_s': body,
		id: path.basename(xmlPath, '.xml').toLowerCase().replace(/_/g, '-'),
	};
};

export default async () => {
	const xmlPaths = xmlFiles.map((f) => `${inputDir}/${f}`);
	const list = [];

	for (const xmlPath of xmlPaths) {
		const xml: string = fs.readFileSync(xmlPath, 'utf8');
		const emptyState = await xml2html(xml, {
			startFromTag: 'body',
			tagClass: 'empty',
			tags: { lb: Lb },
			tagsToSkip: ['c'],
		});

		list.push(postProcess(xmlPath, emptyState));
	}

	const outputPath = `${process.cwd()}/__solr__/input.json`;
	fs.ensureDirSync(path.dirname(outputPath));
	fs.writeJsonSync(outputPath, list);
}