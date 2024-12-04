let moves = '';

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

lineReader.on('line', (line) => {
    moves = line;
}).on('close', () => {
    let floor = 0;
    let index = 0;
    while (floor >= 0 && index < moves.length) {
        if (moves.charAt(index) === '(') {
            floor = floor + 1;
        } else if (moves.charAt(index) === ')') {
            floor = floor - 1;
        }

        index++;
    }

    console.log(`Santa ends up in the basement on position ${index}`);
});
