
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const wordsearch: string[][] = [];
const filledInWordSearch: string[][] = [];

const execute = () => {
    let countOfXMAS = 0;

    for (let i = 0; i < wordsearch.length; i++) {
        for (let j = 0; j < wordsearch[i].length; j++) {
            if (wordsearch[i][j] === 'A') {
                if (j < wordsearch[i].length - 1 && j > 0 && i < wordsearch.length - 1 && i > 0) {
                    // Check upper left to lower right
                    if (wordsearch[i - 1][j - 1] === 'M' && wordsearch[i + 1][j + 1] === 'S') {
                        // Check lower left to upper right and lower right to upper left
                        if (wordsearch[i + 1][j - 1] === 'M' && wordsearch[i - 1][j + 1] === 'S') {
                            countOfXMAS++;
                            filledInWordSearch[i][j] = 'A';
                            filledInWordSearch[i - 1][j - 1] = 'M';
                            filledInWordSearch[i + 1][j + 1] = 'S';
                            filledInWordSearch[i + 1][j - 1] = 'M';
                            filledInWordSearch[i - 1][j + 1] = 'S';
                        } else if (wordsearch[i + 1][j - 1] === 'S' && wordsearch[i - 1][j + 1] === 'M') {
                            countOfXMAS++;
                            filledInWordSearch[i][j] = 'A';
                            filledInWordSearch[i - 1][j - 1] = 'M';
                            filledInWordSearch[i + 1][j + 1] = 'S';
                            filledInWordSearch[i + 1][j - 1] = 'S';
                            filledInWordSearch[i - 1][j + 1] = 'M';
                        }
                    } else if (wordsearch[i - 1][j - 1] === 'S' && wordsearch[i + 1][j + 1] === 'M') {
                        // Check lower left to upper right and lower right to upper left
                        if (wordsearch[i + 1][j - 1] === 'M' && wordsearch[i - 1][j + 1] === 'S') {
                            countOfXMAS++;
                            filledInWordSearch[i][j] = 'A';
                            filledInWordSearch[i - 1][j - 1] = 'S';
                            filledInWordSearch[i + 1][j + 1] = 'M';
                            filledInWordSearch[i + 1][j - 1] = 'M';
                            filledInWordSearch[i - 1][j + 1] = 'S';
                        } else if (wordsearch[i + 1][j - 1] === 'S' && wordsearch[i - 1][j + 1] === 'M') {
                            countOfXMAS++;
                            filledInWordSearch[i][j] = 'A';
                            filledInWordSearch[i - 1][j - 1] = 'S';
                            filledInWordSearch[i + 1][j + 1] = 'M';
                            filledInWordSearch[i + 1][j - 1] = 'S';
                            filledInWordSearch[i - 1][j + 1] = 'M';
                        }
                    }
                }
            }
        }
    }

    console.log(`The cross-MAS appears ${countOfXMAS} times.`);

    if (debug) {
        filledInWordSearch.forEach((line) => {
            console.log(JSON.stringify(line));
        });
    }
}

const parseLine = (line: string) => {
    const parts = line.split('');
    wordsearch.push(parts);

    const filledInPartsArray = [];
    parts.forEach((part) => {
        filledInPartsArray.push('.');
    });
    filledInWordSearch.push(filledInPartsArray);
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test.txt' : './input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};