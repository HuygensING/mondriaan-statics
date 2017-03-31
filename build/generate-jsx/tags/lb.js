"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hi_xml2html_1 = require("hi-xml2html");
const falsifyIsSelfClosing = (data) => (Object.assign({}, data, { isSelfClosing: false }));
class Lb extends hi_xml2html_1.BaseTag {
    constructor(data, state) {
        super(falsifyIsSelfClosing(data), state);
        if (!state.hasOwnProperty('linenumber'))
            state.linenumber = 0;
        state.linenumber = state.linenumber + 1;
        state.usedTags.add('No');
    }
    openAfter() {
        return `<No>${this.state.linenumber}</No>`;
    }
}
exports.default = Lb;
;
