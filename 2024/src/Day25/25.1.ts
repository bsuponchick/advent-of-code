import { Lock, Key } from './25.1.logic';
const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');
const test2 = args.includes('--test2');

const keys: Key[] = [];
const locks: Lock[] = [];
let layout: string[] = [];

const execute = () => {
    console.log(`There are ${keys.length} keys and ${locks.length} locks`);
    let countOfValidCombinations = 0;

    keys.forEach((key) => {
        locks.forEach((lock) => {
            if (key.fitsLock(lock)) {
                countOfValidCombinations++;
            }
        });
    });

    console.log(`There are ${countOfValidCombinations} valid combinations`);
}

const parseLine = (line: string) => {
    if (line.trim() === '') {
        return;
    } else {
        layout.push(line);

        if (layout.length < 7) {
            return;
        }

        if (layout[0].startsWith('#')) {
            locks.push(new Lock(layout));
        } else {
            keys.push(new Key(layout));
        }

        layout = [];
    }
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(test ? './test.txt' : test2 ? './test2.txt' : './input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {
    execute();
});

export {};