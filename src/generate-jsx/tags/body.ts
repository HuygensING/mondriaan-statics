import { JsxTag } from 'hi-xml2html';

export default class Body extends JsxTag {
	open() {
		return `<Body query={props.query}>`;
	}
};