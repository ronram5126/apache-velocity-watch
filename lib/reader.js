const fs = require('fs');

async function waitAndReplaceMatchData(velocityCode, directory, matchResults) {
    let code = "";
    let includes = [];
    let fileReadPromises = matchResults.map(matchResult => readRecursively(matchResult.includeFile, directory));
    let fileReads = await Promise.all(fileReadPromises);

    let writtenIndex = 0;
    for (let c = 0; c < matchResults.length; c++) {
        let { includeFile, codeIndex, codeLength } = matchResults[c];
        let fileRead = fileReads[c];
        
        includes = [].concat(includes, fileRead.includes);

        code += velocityCode.slice(writtenIndex, codeIndex);
        code += fileRead.code;

        writtenIndex = codeIndex + codeLength;
    }

    code += velocityCode.slice(writtenIndex);
    
    return {code, includes};

}


async function findAndReplaceIncludes (velocityCode, directory)  {
    let includeCheck = /#include\(['"]([^'"]*)['"]\)/g, match;                
    let matchResults = [];

    while(match = includeCheck.exec(velocityCode)) {
        let includeFile = match[1];
        let codeIndex = match.index;
        let codeLength = match[0].length;
        matchResults.push({ includeFile, codeIndex, codeLength});                    
    }
    let { code , includes } = await waitAndReplaceMatchData(velocityCode, directory, matchResults);

    includes = [].concat(includes, matchResults.map(matchResult => matchResult.includeFile));

    return { code, includes };
}


function readRecursively(file, directory) {
    return new Promise((res, rej) => {
        fs.readFile(directory + file, (err, data) => {
            if (err) {
                rej(err);
            } else {
                let velocityCode = data.toString();         
                findAndReplaceIncludes(velocityCode, directory)
                    .then(data => res(data))
                    .catch(rej);
            }
        });
    });
}


module.exports = readRecursively;