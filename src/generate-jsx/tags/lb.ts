import {JsxTag} from 'hi-xml2html';

export const falsifyIsSelfClosing = (data) => ({
	...data,
	...{ isSelfClosing: false },
});

export default class Lb extends JsxTag {
	constructor(data, state) {
		super(falsifyIsSelfClosing(data), state);
		if (!state.custom.hasOwnProperty('linenumber')) state.custom.linenumber = 0;
		state.custom.linenumber = state.custom.linenumber + 1;
		state.usedTags.add('No');
	}

	openAfter() {
		return `<No className="no" active={props.lineNumber === '${this.state.custom.linenumber}'}>${this.state.custom.linenumber}</No>`;
	}
};