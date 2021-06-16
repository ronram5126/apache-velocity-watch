#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

require('dotenv').config();
const Velocity = require('velocityjs');

const context = require('../context.json');
const macros = require('../macros');

const read = require('./reader');
const { splitFileName, watchFile: fsWatchFile } = require('./file');


function compileFile(inFile, outFile) {
    let [inFileName, inDirectory] = splitFileName(inFile);
    let [outFileName, outDirectory] = splitFileName(outFile);

    return read(inFileName, inDirectory).then(({ code, includes }) => {
        let renderedCode = Velocity.render(code, context, macros);
        fs.writeFileSync(outDirectory + outFileName, renderedCode);
        return { code: renderedCode, includes, inFileName, inDirectory, outFileName, outDirectory };
    });
}

function compile() {
    let inFile = process.env.INFILE;
    let outFile = process.env.OUTFILE;

    return compileFile(inFile, outFile);
}


function watchFile(inFile, outFile) {
    compileFile(inFile, outFile).then(({includes, inDirectory}) => {
        includes.forEach(include => {
            fsWatchFile(inDirectory + include, () => watchFile());
        });
    });
}

function watch() {
    compile().then(({includes, inDirectory}) => {
        includes.forEach(include => {
            fsWatchFile(inDirectory + include, () => watch());
        });
    });
}


module.exports = { compile, watch, compileFile, watchFile };