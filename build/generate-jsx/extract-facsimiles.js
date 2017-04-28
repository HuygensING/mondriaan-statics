"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const hi_xml2html_1 = require("hi-xml2html");
exports.default = (xmlData) => __awaiter(this, void 0, void 0, function* () {
    const data = [];
    for (const xml of xmlData) {
        const jsxState = yield hi_xml2html_1.default(xml.content, {
            outputType: 'json',
            parent: {
                name: 'facsimile',
            },
        });
        data.push(jsxState.output);
    }
    const facsimiles = data.reduce((agg, facsimile) => {
        const { surface } = facsimile.root.facsimile[0];
        surface.forEach((s) => {
            if (s.graphic == null)
                return;
            const id = s.$['xml:id'];
            const url = s.graphic[0].$['url'];
            agg[id] = url;
        });
        return agg;
    }, {});
    return facsimiles;
});
