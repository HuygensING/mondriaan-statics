"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hi_xml2html_1 = require("hi-xml2html");
class Lb extends hi_xml2html_1.JsxTag {
    open() { return '{{{br}}}'; }
    close() { return ''; }
}
exports.default = Lb;
;
