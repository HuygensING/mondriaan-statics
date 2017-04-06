import { JsxTag } from 'hi-xml2html';

export default class Lb extends JsxTag {
	open() { return '{{{br}}}'; }
	close() { return '' }
};