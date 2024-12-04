
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');

const wordsearch: string[][] = [];

const execute = () => {
    let countOfXMAS = 0;

    for (let i = 0; i < wordsearch.length; i++) {
        for (let j = 0; j < wordsearch[i].length; j++) {
            if (wordsearch[i][j] === 'X') {
                // Check right
                if (j < wordsearch[i].length - 3) {
                    if (wordsearch[i][j + 1] === 'M' && wordsearch[i][j + 2] === 'A' && wordsearch[i][j + 3] === 'S') {
                        countOfXMAS++;
                    }
                }

                // Check left
                if (j > 2) {
                    if (wordsearch[i][j - 1] === 'M' && wordsearch[i][j - 2] === 'A' && wordsearch[i][j - 3] === 'S') {
                        countOfXMAS++;
                    }
                }

                // Check down
                if (i < wordsearch.length - 3) {
                    if (wordsearch[i + 1][j] === 'M' && wordsearch[i + 2][j] === 'A' && wordsearch[i + 3][j] === 'S') {
                        countOfXMAS++;
                    }
                }

                // Check up
                if (i > 2) {
                    if (wordsearch[i - 1][j] === 'M' && wordsearch[i - 2][j] === 'A' && wordsearch[i - 3][j] === 'S') {
                        countOfXMAS++;
                    }
                }

                // Check down right
                if (i < wordsearch.length - 3 && j < wordsearch[i].length - 3) {
                    if (wordsearch[i + 1][j + 1] === 'M' && wordsearch[i + 2][j + 2] === 'A' && wordsearch[i + 3][j + 3] === 'S') {
                        countOfXMAS++;
                    }
                }

                // Check down left
                if (i < wordsearch.length - 3 && j > 2) {
                    if (wordsearch[i + 1][j - 1] === 'M' && wordsearch[i + 2][j - 2] === 'A' && wordsearch[i + 3][j - 3] === 'S') {
                        countOfXMAS++;
                    }
                }

                // Check up right
                if (i > 2 && j < wordsearch[i].length - 3) {
                    if (wordsearch[i - 1][j + 1] === 'M' && wordsearch[i - 2][j + 2] === 'A' && wordsearch[i - 3][j + 3] === 'S') {
                        countOfXMAS++;
                    }
                }

                // Check up left
                if (i > 2 && j > 2) {
                    if (wordsearch[i - 1][j - 1] === 'M' && wordsearch[i - 2][j - 2] === 'A' && wordsearch[i - 3][j - 3] === 'S') {
                        countOfXMAS++;
                    }
                }
            }
        }
    }

    console.log(`The word XMAS appears ${countOfXMAS} times.`);
}

const parseLine = (line: string) => {
    const parts = line.split('');
    wordsearch.push(parts);
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