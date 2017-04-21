import { JsxTag } from 'hi-xml2html';

const changeName = (data) => ({
	...data,
	...{ name: 'notes' },
});

export default class Notes extends JsxTag {
	constructor(data, state) {
		super(changeName(data), state);
	}
};
