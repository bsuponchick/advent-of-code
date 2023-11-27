const args = process.argv;
const debug = args.includes('--debug');
const test = args.includes('--test');


const elves: string[][] = [];
const elfCalorieCounts: number[] = [];
let currentElf: string[] | null = null;

const execute = () => {
    // This is where you add your code
    console.log(`There are ${elves.length} elves`);
    elves.forEach((elf) => {
        let totalCalories = 0;
        elf.forEach((foodCalories) => {
            totalCalories += Number.parseInt(foodCalories, 10);
        });

        elfCalorieCounts.push(totalCalories);
    });

    elfCalorieCounts.sort((a, b) => {
        const numberA = a;
        const numberB = b;

        if (numberA < numberB) {
            return -1;
        } else if (numberA > numberB) {
            return 1;
        } else {
            return 0;
        }
    });

    elfCalorieCounts.reverse();
    console.log(`The elf with the most calories is carrying ${elfCalorieCounts[0]} calories`);

    let top3CalorieCount = elfCalorieCounts[0] + elfCalorieCounts[1] + elfCalorieCounts[2];

    console.log(`The top 3 elves are carrying ${top3CalorieCount} calories`);
}

const parseLine = (line) => {
    // Include line parsing logic here
    if (line.length === 0) {
        elves.push([...currentElf as string[]]);
        currentElf = null;
    } else {
        if (currentElf === null) {
            currentElf = [line];
        } else {
            currentElf.push(line);
        }
    }
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