const rucksacks = [];

const priorityOrder = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const determinePriority = (letter) => {
    let index = priorityOrder.indexOf(letter.toLowerCase());
    if (letter === priorityOrder[index]) {
        return index + 1;
    } else {
        return index + 27;
    }
};

const findFirstCommonLetter = (compartmentA, compartmentB) => {
    for (i = 0; i < compartmentA.length; i++) {
        if (compartmentB.indexOf(compartmentA.charAt(i)) >= 0) {
            return compartmentA.charAt(i);
        }
    }
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

lineReader.on('line', (line) => {
    rucksacks.push([line.slice(0, (line.length / 2)), line.slice((line.length / 2))]);
}).on('close', () => {
    console.log(`There are ${rucksacks.length} rucksacks`);
    
    let sumOfPriorities = 0;

    rucksacks.forEach((rucksack) => {
        const commonLetter = findFirstCommonLetter(rucksack[0], rucksack[1]);
        const priority = determinePriority(commonLetter);
        sumOfPriorities = sumOfPriorities + priority;
    });

    console.log(`The sum of all priorities is ${sumOfPriorities}`);
});
