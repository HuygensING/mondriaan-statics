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
const path = require("path");
const hi_xml2html_1 = require("hi-xml2html");
const lb_1 = require("./tags/lb");
const constants_1 = require("../constants");
exports.default = () => __awaiter(this, void 0, void 0, function* () {
    const xmlPaths = constants_1.xmlFiles.map((f) => `${constants_1.inputDir}/xml/${f}`);
    for (const xmlPath of xmlPaths) {
        const xml = fs.readFileSync(xmlPath, 'utf8');
        const tsx = yield hi_xml2html_1.default(xml, {
            componentsPath: 'client/components/entry-tags',
            jsx: true,
            startFromTag: 'body',
            tags: {
                lb: lb_1.default,
            }
        });
        const outputPath = xmlPath
            .replace(constants_1.inputDir, constants_1.outputDir)
            .replace('.xml', '.tsx');
        fs.ensureDirSync(path.dirname(outputPath));
        fs.writeFileSync(outputPath, tsx, 'utf8');
    }
});
