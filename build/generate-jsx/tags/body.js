"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hi_xml2html_1 = require("hi-xml2html");
class Body extends hi_xml2html_1.JsxTag {
    open() {
        return `<Body query={props.query}>`;
    }
}
exports.default = Body;
;
