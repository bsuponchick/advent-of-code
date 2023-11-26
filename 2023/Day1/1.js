const arguments = process.argv;
const debug = arguments.includes('--debug');
const test = arguments.includes('--test');


const elves = [];
const elfCalorieCounts = [];
let currentElf = null;

execute = () => {
    // This is where you add your code
    console.log(`There are ${elves.length} elves`);
    elves.forEach((elf) => {
        let totalCalories = 0;
        elf.forEach((foodCalories) => {
            totalCalories += Number.parseInt(foodCalories, 10);
        });

        elfCalorieCounts.push(Number.parseInt(totalCalories, 10));
    });

    elfCalorieCounts.sort((a, b) => {
        const numberA = Number.parseInt(a, 10);
        const numberB = Number.parseInt(b, 10);

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

parseLine = (line) => {
    // Include line parsing logic here
    if (line.length === 0) {
        elves.push([...currentElf]);
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