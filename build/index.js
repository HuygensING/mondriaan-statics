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
const fetch_1 = require("./fetch");
const generate_jsx_1 = require("./generate-jsx");
const constants_1 = require("./constants");
const colors = require('colors');
const development = process.env.NODE_ENV === 'development';
const main = () => __awaiter(this, void 0, void 0, function* () {
    if (!development || !fs.existsSync(constants_1.inputDir))
        yield fetch_1.default();
    fs.emptyDirSync(constants_1.outputDir);
    process.stdout.write('* Generate JSX from XML. '.cyan);
    yield generate_jsx_1.default();
    console.log('Done.'.green);
    if (!development)
        fs.removeSync(constants_1.inputDir);
    console.log('\nA L L   D O N E ! ! !\n'.rainbow.bold);
});
main();
