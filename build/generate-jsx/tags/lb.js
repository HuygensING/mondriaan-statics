"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hi_xml2html_1 = require("hi-xml2html");
exports.falsifyIsSelfClosing = (data) => (Object.assign({}, data, { isSelfClosing: false }));
class Lb extends hi_xml2html_1.JsxTag {
    constructor(data, state) {
        super(exports.falsifyIsSelfClosing(data), state);
        if (!state.custom.hasOwnProperty('linenumber'))
            state.custom.linenumber = 0;
        state.custom.linenumber = state.custom.linenumber + 1;
        state.usedTags.add('No');
    }
    openAfter() {
        return `<No className="no" active={props.lineNumber === '${this.state.custom.linenumber}'}>${this.state.custom.linenumber}</No>`;
    }
}
exports.default = Lb;
;
