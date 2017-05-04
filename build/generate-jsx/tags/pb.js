"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hi_xml2html_1 = require("hi-xml2html");
const lb_1 = require("./lb");
class Pb extends hi_xml2html_1.JsxTag {
    constructor(data, state) {
        super(lb_1.falsifyIsSelfClosing(data), state);
        state.usedTags.add('FacsThumb');
    }
    openAfter() {
        const { facsimiles } = this.state.custom;
        let { facs } = this.data.attributes;
        if (facs != null)
            facs = facs.slice(1);
        return facsimiles != null && facsimiles.hasOwnProperty(facs) ?
            `<FacsThumb activateFacsimile={props.activateFacsimile} activeNote={props.activeNote} url="${facsimiles[facs]}" />` :
            '';
    }
}
exports.default = Pb;
;
