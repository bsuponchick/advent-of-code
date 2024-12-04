let santaMoves = '';
let robosantaMoves = '';
const houses = [];
let santaPosition = null;
let robosantaPosition = null;

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

const visitNewHouse = (x, y, isSanta) => {
    const house = new House(x,y);
    house.visit();
    houses.push(house);

    if (isSanta) {
        santaPosition = house;
    } else {
        robosantaPosition = house;
    }
}

const visitExistingHouse = (house, isSanta) => {
    house.visit();

    if (isSanta) {
        santaPosition = house;
    } else {
        robosantaPosition = house;
    }
}

const getExistingHouse = (x, y) => {
    return houses.find((house) => {
        return (house.x === x) && (house.y === y);
    });
}

navigate = (direction, isSanta) => {
    const currentHouse = isSanta ? santaPosition : robosantaPosition;
    if (direction === '^') {
        // Go North
        const existingHouse = getExistingHouse(currentHouse.x, currentHouse.y + 1);
        if (existingHouse) {
            visitExistingHouse(existingHouse, isSanta);
        } else {
            visitNewHouse(currentHouse.x, currentHouse.y + 1, isSanta);
        }
    } else if (direction === 'v') {
        // Go South
        const existingHouse = getExistingHouse(currentHouse.x, currentHouse.y - 1);
        if (existingHouse) {
            visitExistingHouse(existingHouse, isSanta);
        } else {
            visitNewHouse(currentHouse.x, currentHouse.y - 1, isSanta);
        }
    } else if (direction === '>') {
        // Go East
        const existingHouse = getExistingHouse(currentHouse.x + 1, currentHouse.y);
        if (existingHouse) {
            visitExistingHouse(existingHouse, isSanta);
        } else {
            visitNewHouse(currentHouse.x + 1, currentHouse.y, isSanta);
        }
    } else if (direction === '<') {
        // Go West
        const existingHouse = getExistingHouse(currentHouse.x - 1, currentHouse.y);
        if (existingHouse) {
            visitExistingHouse(existingHouse, isSanta);
        } else {
            visitNewHouse(currentHouse.x - 1, currentHouse.y, isSanta);
        }
    }
}

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

lineReader.on('line', (line) => {
    for (let i = 0; i < line.length; i++) {
        if (i % 2 === 0) {
            santaMoves = santaMoves + line.charAt(i);
        } else {
            robosantaMoves = robosantaMoves + line.charAt(i);
        }
    }
}).on('close', () => {
    console.log(`Santa moves are ${santaMoves}`);
    console.log(`RoboSanta moves are ${robosantaMoves}`);
    visitNewHouse(0,0, true);
    visitExistingHouse(getExistingHouse(0,0), false);
    
    for (let i = 0; i < santaMoves.length; i++) {
        navigate(santaMoves.charAt(i), true);
        navigate(robosantaMoves.charAt(i), false);
    }

    console.log(`The Santas ends up visiting ${houses.length} unique houses.`);
});
