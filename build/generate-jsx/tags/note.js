"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hi_xml2html_1 = require("hi-xml2html");
exports.addKey = (data) => (Object.assign({}, data, Object.assign({}, data.attributes, {
    key: data.attributes.n,
})));
class Note extends hi_xml2html_1.JsxTag {
    constructor(data, state) {
        super(exports.addKey(data), state);
    }
}
exports.default = Note;
;
