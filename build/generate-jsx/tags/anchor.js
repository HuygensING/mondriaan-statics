"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hi_xml2html_1 = require("hi-xml2html");
class Anchor extends hi_xml2html_1.JsxTag {
    constructor() {
        super(...arguments);
        this.passProps = true;
    }
}
exports.default = Anchor;
;
