"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hi_xml2html_1 = require("hi-xml2html");
const changeName = (data) => (Object.assign({}, data, { name: 'notes' }));
class Notes extends hi_xml2html_1.JsxTag {
    constructor(data, state) {
        super(changeName(data), state);
    }
}
exports.default = Notes;
;
