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
const child_process_1 = require("child_process");
const fs = require("fs-extra");
const constants_1 = require("../constants");
const { svnUser, svnServer, svnPath } = fs.readJsonSync('./config.json');
const files = constants_1.xmlFiles.map((f) => `TEKSTEN/Writings/${f}`);
const exportXmlFile = (svnFilePath) => new Promise((resolve, reject) => {
    const xmlOutputPath = `${constants_1.inputDir}/xml`;
    const command = `svn export svn+ssh://${svnUser}@${svnServer}${svnPath}${svnFilePath} ${xmlOutputPath}`;
    child_process_1.exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(error);
            return reject();
        }
        fs.removeSync(`${xmlOutputPath}/.svn`);
        resolve();
    });
});
exports.default = () => __awaiter(this, void 0, void 0, function* () {
    fs.emptyDirSync(`${constants_1.inputDir}/xml`);
    yield Promise.all(files.map(exportXmlFile));
});
