let moves = '';
const houses = [];
let currentHouse = null;

class House {
    constructor(x, y) {
        this.presents = 0;
        this.x = x;
        this.y = y;
    }

    visit = () => {
        this.presents++;
    }
}

const visitNewHouse = (x, y) => {
    const house = new House(x,y);
    house.visit();
    houses.push(house);
    currentHouse = house;
}

const visitExistingHouse = (house) => {
    house.visit();
    currentHouse = house;
}

const getExistingHouse = (x, y) => {
    return houses.find((house) => {
        return (house.x === x) && (house.y === y);
    });
}

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

lineReader.on('line', (line) => {
    moves = line;
}).on('close', () => {
    visitNewHouse(0,0);

    for (let i = 0; i < moves.length; i++) {
        if (moves.charAt(i) === '^') {
            // Go North
            const existingHouse = getExistingHouse(currentHouse.x, currentHouse.y + 1);
            if (existingHouse) {
                visitExistingHouse(existingHouse);
            } else {
                visitNewHouse(currentHouse.x, currentHouse.y + 1);
            }
        } else if (moves.charAt(i) === 'v') {
            // Go South
            const existingHouse = getExistingHouse(currentHouse.x, currentHouse.y - 1);
            if (existingHouse) {
                visitExistingHouse(existingHouse);
            } else {
                visitNewHouse(currentHouse.x, currentHouse.y - 1);
            }
        } else if (moves.charAt(i) === '>') {
            // Go East
            const existingHouse = getExistingHouse(currentHouse.x + 1, currentHouse.y);
            if (existingHouse) {
                visitExistingHouse(existingHouse);
            } else {
                visitNewHouse(currentHouse.x + 1, currentHouse.y);
            }
        } else if (moves.charAt(i) === '<') {
            // Go West
            const existingHouse = getExistingHouse(currentHouse.x - 1, currentHouse.y);
            if (existingHouse) {
                visitExistingHouse(existingHouse);
            } else {
                visitNewHouse(currentHouse.x - 1, currentHouse.y);
            }
        }
    }

    console.log(`Santa ends up visiting ${houses.length} unique houses.`);
});
