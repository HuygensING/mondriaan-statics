import xml2html from 'hi-xml2html';
import {IXmlData} from "./index";
import {IState} from "hi-xml2html/build/types";

export default async (xmlData: IXmlData[]) => {
	const data = [];
	for (const xml of xmlData) {
		const jsxState: IState = await xml2html(xml.content, {
			outputType: 'json',
			parent: {
				name: 'facsimile',
			},
		});
		data.push(jsxState.output);
	}

	const facsimiles = data.reduce((agg, facsimile) => {
		const { surface } = facsimile.root.facsimile[0];
		surface.forEach((s) => {
			if (s.graphic == null) return;
			const id = s.$['xml:id'];
			const url = s.graphic[0].$['url'];
			agg[id] = url;
		});
		return agg;
	}, {});

	return facsimiles;
};
