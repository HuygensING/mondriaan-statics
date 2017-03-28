import * as fs from 'fs-extra';
import * as path from 'path';
import xml2html from 'hi-xml2html';
import Lb from './tags/lb';
import {xmlFiles, inputDir, outputDir} from "../constants";

export default async () => {
	const xmlPaths = xmlFiles.map((f) => `${inputDir}/xml/${f}`);
	for (const xmlPath of xmlPaths) {
		const xml: string = fs.readFileSync(xmlPath, 'utf8');
		const tsx: string = await xml2html(xml, {
			componentsPath: 'client/components/entry-tags',
			jsx: true,
			startFromTag: 'body',
			tags: {
				lb: Lb,
			}
		});
		const outputPath = xmlPath
			.replace(inputDir, outputDir)
			.replace('.xml', '.tsx');
		fs.ensureDirSync(path.dirname(outputPath));
		fs.writeFileSync(outputPath, tsx, 'utf8')
	}
}
