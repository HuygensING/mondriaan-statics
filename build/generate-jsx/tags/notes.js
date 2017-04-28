"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hi_xml2html_1 = require("hi-xml2html");
class Notes extends hi_xml2html_1.JsxTag {
    open() {
        return `<${this.name()} activeNote={props.activeNote}>`;
    }
    name() {
        return 'Notes';
    }
}
exports.default = Notes;
;
