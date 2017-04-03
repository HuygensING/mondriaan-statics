import * as fs from 'fs-extra';
import * as path from 'path';
import xml2html from 'hi-xml2html';
import Lb from './tags/lb';
import {xmlFiles, inputDir, outputDir} from "../constants";

const postProcess = (state): string => {
	const tags = [...state.usedTags].join(', ');

	return (
// Do not indent!
		`import * as React from 'react';
import { ${tags} } from '${state.componentsPath}';

export default () => (
	<div className="wrapper">
		${state.output}
	</div>
);`
	);
};

export default async () => {
	const xmlPaths = xmlFiles.map((f) => `${inputDir}/${f}`);
	for (const xmlPath of xmlPaths) {
		const xml: string = fs.readFileSync(xmlPath, 'utf8');
		const jsxState = await xml2html(xml, {
			tagClass: 'jsx',
			componentsPath: 'mondrian-components',
			startFromTag: 'body',
			tags: {
				lb: Lb,
			}
		});
		const outputPath = xmlPath
			.replace(inputDir, outputDir)
			.replace('.xml', '.tsx');
		fs.ensureDirSync(path.dirname(outputPath));
		fs.writeFileSync(outputPath, postProcess(jsxState), 'utf8')
	}
}
