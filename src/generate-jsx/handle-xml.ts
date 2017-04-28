import xml2html from 'hi-xml2html';
import * as fs from 'fs-extra';
import {Tag as SaxTag} from "../../../hi-xml2html/node_modules/@types/sax";
import Notes from "./tags/notes";
import Anchor from "./tags/anchor";
import Body from "./tags/body";
import Lb from "./tags/lb";
import {xmlDir} from "../constants";
import * as path from "path";
import {IXmlData} from "./index";
import {ISettings, IState} from "hi-xml2html/build/types";
import Pb from "./tags/pb";

const postProcess = (state: IState): string => {
	const tags = [...state.usedTags].join(', ');
	let output = state.output
		.replace(/\n/g, '')
		.replace(/\s+/g, ' ')
		.replace(/> </g, '><');

	if (!output.length) output = 'null';

	return `import * as React from 'react'; import { ${tags} } from '${state.settings.componentsPath}'; export default (props) => (${output});`;
};

const xml2htmlOptions: ISettings = {
	outputType: 'jsx',
	componentsPath: 'mondrian-components',
	parent: {
		name: 'body',
	},
	getComponent: (node: SaxTag) => {
		if (
			node.name === 'div' &&
			(
				node.attributes.type === 'origNotes' ||
				node.attributes.type === 'edsNotes'
			)
		) return Notes;

		const compByNodeName = {
			anchor: Anchor,
			body: Body,
			lb: Lb,
			pb: Pb,
		};

		return compByNodeName[node.name];
	},
	transformTextNode: (text: string) => {
		return `<span>${text}</span>`;
	},
};

export default async (xmlData: IXmlData[], outputDir: string, options: ISettings={}) => {
	let usedTags = new Set();
	for (const xml of xmlData) {
		const opts: ISettings = {...xml2htmlOptions, ...options};
		const jsxState: IState = await xml2html(xml.content, opts);
		const outputPath = xml.path
			.replace(xmlDir, outputDir)
			.replace('.xml', '.tsx');
		fs.ensureDirSync(path.dirname(outputPath));
		fs.writeFileSync(outputPath, postProcess(jsxState), 'utf8')
		usedTags = new Set([...usedTags, ...jsxState.usedTags]);
	}

	return [...usedTags];
};
