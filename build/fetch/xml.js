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
const readline = require("readline");
const askSvnCreds = () => __awaiter(this, void 0, void 0, function* () {
    const question = (q) => new Promise((resolve, reject) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        rl.question(q, (answer) => {
            resolve(answer);
            rl.close();
        });
    });
    const svnUser = yield question('SVN username? ');
    const svnServer = yield question('SVN server? ');
    const svnPath = yield question('SVN path? ');
    const doubleCheck = yield question(`Does this look correct? svn+ssh://${svnUser}@${svnServer}${svnPath} `);
    if (doubleCheck !== '' && doubleCheck.slice(0, 1).toLowerCase() !== 'y') {
        console.log('Please try again...'.red);
        process.exit(0);
    }
    return { svnUser, svnServer, svnPath };
});
const exportXmlFile = (config) => (svnFilePath) => new Promise((resolve, reject) => {
    const { svnUser, svnServer, svnPath } = config;
    const command = `svn export svn+ssh://${svnUser}@${svnServer}${svnPath}${svnFilePath} ${constants_1.xmlDir}`;
    console.log(command, '\n\n');
    child_process_1.exec(command, (error, stdout, stderr) => {
        if (error) {
            return reject(stderr);
        }
        fs.removeSync(`${constants_1.xmlDir}/.svn`);
        resolve();
    });
});
exports.default = () => __awaiter(this, void 0, void 0, function* () {
    let config;
    try {
        config = fs.readJsonSync(`${process.cwd()}/config.json`);
    }
    catch (e) {
        console.log();
        console.log('[ERROR] No SVN credentials found. Care to share?'.red);
        config = yield askSvnCreds();
    }
    fs.emptyDirSync(constants_1.xmlDir);
    const files = constants_1.xmlFiles.map((f) => `editie/geschriften/${f}`);
    yield Promise.all(files.map(exportXmlFile(config)))
        .catch((e) => {
        fs.removeSync(constants_1.xmlDir);
        console.log(e.red);
        process.exit();
    });
});
