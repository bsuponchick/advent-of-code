const rounds = [];

const ROCK = {
    opponent: 'A',
    me: 'X',
    value: 1
};
const PAPER = {
    opponent: 'B',
    me: 'Y',
    value: 2
};
const SCISSORS = {
    opponent: 'C',
    me: 'Z',
    value: 3
};

const WIN = 6;
const LOSE = 0;
const DRAW = 3;

const score = (opponent, me) => {
    let result;

    if (me === ROCK.me) {
        if (opponent === ROCK.opponent) {
            result = ROCK.value + DRAW;
        } else if (opponent === PAPER.opponent) {
            result = ROCK.value + LOSE;
        } else {
            result = ROCK.value + WIN;
        }
    } else if (me === PAPER.me) {
        if (opponent === ROCK.opponent) {
            result = PAPER.value + WIN;
        } else if (opponent === PAPER.opponent) {
            result = PAPER.value + DRAW;
        } else {
            result = PAPER.value + LOSE;
        }
    } else if (me === SCISSORS.me) {
        if (opponent === ROCK.opponent) {
            result = SCISSORS.value + LOSE;
        } else if (opponent === PAPER.opponent) {
            result = SCISSORS.value + WIN;
        } else {
            result = SCISSORS.value + DRAW;
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
