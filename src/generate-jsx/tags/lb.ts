import { BaseTag } from 'hi-xml2html';

const falsifyIsSelfClosing = (data) => ({
	...data,
	...{ isSelfClosing: false },
});

export default class Lb extends BaseTag {
	constructor(data, state) {
		super(falsifyIsSelfClosing(data), state);
		if (!state.hasOwnProperty('linenumber')) state.linenumber = 0;
		state.linenumber = state.linenumber + 1;
		state.usedTags.add('Linenumber');
	}

	openAfter() {
		return `<Linenumber>${this.state.linenumber}</Linenumber>`;
	}
};