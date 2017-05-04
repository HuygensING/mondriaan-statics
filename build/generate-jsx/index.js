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
const fs = require("fs-extra");
const colors = require('colors');
const MondrianComponents = require("mondrian-components");
const constants_1 = require("../constants");
const handle_xml_1 = require("./handle-xml");
const extract_facsimiles_1 = require("./extract-facsimiles");
exports.default = () => __awaiter(this, void 0, void 0, function* () {
    const xmlPaths = constants_1.xmlFiles.map((f) => `${constants_1.xmlDir}/${f}`);
    const xmlData = xmlPaths.map((xmlPath) => ({
        content: fs.readFileSync(xmlPath, 'utf8'),
        path: xmlPath,
    }));
    const facsimiles = yield extract_facsimiles_1.default(xmlData);
    const usedTagsInText = yield handle_xml_1.default(xmlData, constants_1.entriesDir, {
        ignore: [
            {
                attribute: 'type',
                name: 'div',
                value: 'origNotes',
            }
        ],
        state: {
            facsimiles,
        }
    });
    const usedTagsInEditorNotes = yield handle_xml_1.default(xmlData, constants_1.edsNotesDir, {
        parent: {
            attribute: 'type',
            name: 'div',
            value: 'edsNotes',
        },
    });
    const usedTagsInOrigNotes = yield handle_xml_1.default(xmlData, constants_1.origNotesDir, {
        parent: {
            attribute: 'type',
            name: 'div',
            value: 'origNotes',
        },
    });
    const usedTags = usedTagsInText.concat(usedTagsInEditorNotes, usedTagsInOrigNotes);
    const definedTags = Object.keys(MondrianComponents);
    const undefinedTags = [...usedTags].filter((t) => definedTags.indexOf(t) === -1);
    if (undefinedTags.length)
        console.log(`\nUndefined tags: ${undefinedTags.join(', ')}`.red);
});
