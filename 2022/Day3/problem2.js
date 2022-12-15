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

const findLongestString = (a, b, c) => {
    const lengths = [a.length, b.length, c.length].sort().reverse();
    return a.length === lengths[0] ? a : b.length === lengths[0] ? b : c;
};

const findFirstCommonLetter = (rucksackA, rucksackB, rucksackC) => {
    const longestString = findLongestString(rucksackA, rucksackB, rucksackC);    
    
    for (i = 0; i < longestString.length; i++) {
        const character = longestString.charAt(i);
        if ((rucksackA.indexOf(character) >= 0) && (rucksackB.indexOf(character) >= 0) && (rucksackC.indexOf(character) >= 0)) {
            return character;
        }
    }
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

lineReader.on('line', (line) => {
    rucksacks.push(line);
}).on('close', () => {
    console.log(`There are ${rucksacks.length} rucksacks`);
    const groups = [];

    while (rucksacks.length > 0) {
        groups.push([rucksacks.shift(), rucksacks.shift(), rucksacks.shift()]);
    }
    
    let sumOfPriorities = 0;

    groups.forEach((group) => {
        const commonLetter = findFirstCommonLetter(group[0], group[1], group[2]);
        const priority = determinePriority(commonLetter);
        sumOfPriorities = sumOfPriorities + priority;
    });

    console.log(`The sum of all priorities is ${sumOfPriorities}`);
});
