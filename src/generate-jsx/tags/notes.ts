import { JsxTag } from 'hi-xml2html';

export default class Notes extends JsxTag {
	public open() {
		return `<${this.name()} activeNote={props.activeNote} noteTop={props.noteTop}>`;
	}

	public name() {
		return 'Notes';
	}
};
