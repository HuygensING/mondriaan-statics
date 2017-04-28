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
const fs = require("fs-extra");
const notes_1 = require("./tags/notes");
const anchor_1 = require("./tags/anchor");
const body_1 = require("./tags/body");
const lb_1 = require("./tags/lb");
const constants_1 = require("../constants");
const path = require("path");
const pb_1 = require("./tags/pb");
const postProcess = (state) => {
    const tags = [...state.usedTags].join(', ');
    let output = state.output
        .replace(/\n/g, '')
        .replace(/\s+/g, ' ')
        .replace(/> </g, '><');
    if (!output.length)
        output = 'null';
    return `import * as React from 'react'; import { ${tags} } from '${state.settings.componentsPath}'; export default (props) => (${output});`;
};
const xml2htmlOptions = {
    outputType: 'jsx',
    componentsPath: 'mondrian-components',
    parent: {
        name: 'body',
    },
    getComponent: (node) => {
        if (node.name === 'div' &&
            (node.attributes.type === 'origNotes' ||
                node.attributes.type === 'edsNotes'))
            return notes_1.default;
        const compByNodeName = {
            anchor: anchor_1.default,
            body: body_1.default,
            lb: lb_1.default,
            pb: pb_1.default,
        };
        return compByNodeName[node.name];
    },
    transformTextNode: (text) => {
        return `<span>${text}</span>`;
    },
};
exports.default = (xmlData, outputDir, options = {}) => __awaiter(this, void 0, void 0, function* () {
    let usedTags = new Set();
    for (const xml of xmlData) {
        const opts = Object.assign({}, xml2htmlOptions, options);
        const jsxState = yield hi_xml2html_1.default(xml.content, opts);
        const outputPath = xml.path
            .replace(constants_1.xmlDir, outputDir)
            .replace('.xml', '.tsx');
        fs.ensureDirSync(path.dirname(outputPath));
        fs.writeFileSync(outputPath, postProcess(jsxState), 'utf8');
        usedTags = new Set([...usedTags, ...jsxState.usedTags]);
    }
    return [...usedTags];
});
