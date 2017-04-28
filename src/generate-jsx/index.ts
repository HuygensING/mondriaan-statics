import * as fs from "fs-extra";
const colors = require('colors');
import * as MondrianComponents from 'mondrian-components';
import {xmlFiles, xmlDir, entriesDir, edsNotesDir, origNotesDir} from "../constants";
import handleXml from './handle-xml';
import extractFacsimiles from './extract-facsimiles';

export interface IXmlData {
	content: string;
	path: string;
}

export default async () => {
	const xmlPaths: string[] = xmlFiles.map((f) => `${xmlDir}/${f}`);
	const xmlData: IXmlData[] = xmlPaths.map((xmlPath) => ({
		content: fs.readFileSync(xmlPath, 'utf8'),
		path: xmlPath,
	}));

	// Extract facsimiles
	const facsimiles = await extractFacsimiles(xmlData);

	// Parse text (writes a tsx file per entry)
	const usedTagsInText = await handleXml(xmlData, entriesDir, {
		ignore: [{
			attribute: 'type',
			name: 'div',
			value: 'edsNotes',
		}, {
			attribute: 'type',
			name: 'div',
			value: 'origNotes',
		}],
		state: {
			facsimiles,
		}
	});

	// Parse editor notes (writes a tsx file per entry)
	const usedTagsInEditorNotes = await handleXml(xmlData, edsNotesDir, {
		parent: {
			attribute: 'type',
			name: 'div',
			value: 'edsNotes',
		},
	});

	// Parse orig notes (writes a tsx file per entry)
	const usedTagsInOrigNotes = await handleXml(xmlData, origNotesDir, {
		parent: {
			attribute: 'type',
			name: 'div',
			value: 'origNotes',
		},
	});

	// Log undefined tags
	const usedTags = usedTagsInText.concat(usedTagsInEditorNotes, usedTagsInOrigNotes);
	const definedTags = Object.keys(MondrianComponents);
	const undefinedTags = [...usedTags].filter((t) => definedTags.indexOf(t) === -1);
	if (undefinedTags.length) console.log(`\nUndefined tags: ${undefinedTags.join(', ')}`.red)
}
