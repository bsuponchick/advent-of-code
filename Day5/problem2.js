const stacks = [
    ['P','Z','M','T','R','C','N'],
    ['Z','B','S','T','N','D'],
    ['G','T','C','F','R','Q','H','M'],
    ['Z','R','G'],
    ['H','R','N','Z'],
    ['D','L','Z','P','W','S','H','F'],
    ['M','G','C','R','Z','D','W'],
    ['Q','Z','W','H','L','F','J','S'],
    ['N','W','P','Q','S']
];

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

lineReader.on('line', (line) => {
    const formatted = line.replace('move ', '').replace(' from ', ',').replace(' to ', ',');
    const instruction = formatted.split(',').map((value) => Number.parseInt(value, 10));

    const crates = stacks[instruction[1] - 1].splice(0, instruction[0]);
    stacks[instruction[2] - 1] = [...crates, ...(stacks[instruction[2] - 1])];

    console.log(`Stacks is ${JSON.stringify(stacks)}`);
}).on('close', () => {
    const tops = stacks.map((stack) => stack[0]);
    console.log(`The tops of each stack are ${JSON.stringify(tops)}`);
});
