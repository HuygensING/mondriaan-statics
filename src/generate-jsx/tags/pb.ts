import {JsxTag} from 'hi-xml2html';
import {falsifyIsSelfClosing} from "./lb";

export default class Pb extends JsxTag {
	constructor(data, state) {
		super(falsifyIsSelfClosing(data), state);
		state.usedTags.add('FacsThumb');
	}

	openAfter() {
		const { facsimiles } = this.state.custom;
		let { facs } = this.data.attributes;
		if (facs != null) facs = facs.slice(1);

		return facsimiles != null && facsimiles.hasOwnProperty(facs) ?
			`<FacsThumb activateFacsimile={props.activateFacsimile} url="${facsimiles[facs]}" />` :
			'';
	}
};