import * as fs from 'fs-extra';
import * as path from 'path';
import xml2html from 'hi-xml2html';
import {xmlFiles, xmlDir, idByFilename} from "../constants";
import Lb from "./tags/lb";


const postProcess = (xmlPath, state) =>
	state.output
		.replace(/"/g, '\"')
		.replace(/\s\s+/g, ' ')
		.split('{{{br}}}')
		.map((l, i) => ({
			id: idByFilename[path.basename(xmlPath)] + '___' + i,
			line_t: l,
		}))
		.slice(1);

export default async () => {
	const xmlPaths = xmlFiles.map((f) => `${xmlDir}/${f}`);
	let list = [];

	for (const xmlPath of xmlPaths) {
		const xml: string = fs.readFileSync(xmlPath, 'utf8');
		const emptyState = await xml2html(xml, {
			parent: {
				name: 'body',
			},
			outputType: 'empty',
			getComponent: (node) => {
				if (node.name === 'lb') return Lb;
			},
			ignore: [{ name: 'c' }],
		});

		list = list.concat(postProcess(xmlPath, emptyState));
	}

	const outputPath = `${process.cwd()}/__solr__/input.json`;
	fs.ensureDirSync(path.dirname(outputPath));
	fs.writeJsonSync(outputPath, list);
}
