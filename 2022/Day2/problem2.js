const rounds = [];

const ROCK = {
    input: 'A',
    value: 1
};
const PAPER = {
    input: 'B',
    value: 2
};
const SCISSORS = {
    input: 'C',
    value: 3
};

const WIN = {
    input: 'Z',
    value: 6
};
const LOSE = {
    input: 'X',
    value: 0
};
const DRAW = {
    input: 'Y',
    value: 3
};

const score = (opponent, outcome) => {
    let result;

    if (opponent === ROCK.input) {
        if (outcome === WIN.input) {
            result = PAPER.value + WIN.value;
        } else if (outcome === LOSE.input) {
            result = SCISSORS.value + LOSE.value;
        } else {
            result = ROCK.value + DRAW.value;
        }
    } else if (opponent === PAPER.input) {
        if (outcome === WIN.input) {
            result = SCISSORS.value + WIN.value;
        } else if (outcome === LOSE.input) {
            result = ROCK.value + LOSE.value;
        } else {
            result = PAPER.value + DRAW.value;
        }
    } else if (opponent === SCISSORS.input) {
        if (outcome === WIN.input) {
            result = ROCK.value + WIN.value;
        } else if (outcome === LOSE.input) {
            result = PAPER.value + LOSE.value;
        } else {
            result = SCISSORS.value + DRAW.value;
        }
    }

    return result;
}

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

lineReader.on('line', (line) => {
    const round = line.split(' ');
    rounds.push(round);
}).on('close', () => {
    console.log(`There are ${rounds.length} rounds`);

    let totalScore = 0;

    rounds.forEach((round) => {
        totalScore = totalScore + score(round[0], round[1]);
    });

    console.log(`Total score if all rounds go as planned is ${totalScore}`);
});
