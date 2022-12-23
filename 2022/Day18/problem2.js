const DEBUG = {
    ALL: 3,
    TRACE: 2,
    INFO: 1,
    NONE: 0
};

const TYPE = {
    BLOCK: 1,
    AIR: 2,
    OUTER_SPACE: 3
};

let debug = DEBUG.NONE;
const blocks = [];
let air = [];

let minX = 99999999;
let maxX = 0;
let minY = 99999999;
let maxY = 0;
let minZ = 99999999;
let maxZ = 0;

let starterBlock;
let outerSpaceCount = 0;

class Block {
    constructor (x, y, z, type) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.connections = [];
        this.edgeLength = 1;
        this.type = type;
    }
    
    equals = (block) => {
        return (this.x === block.x) && (this.y === block.y) && (this.z === block.z);
    }

    print = () => {
        console.log(`>>> Block ${this.x},${this.y},${this.z} <<<`);
        console.log(`Type: ${this.type === TYPE.BLOCK ? 'block' : 'air'}`);
        console.log(`Connections: ${this.connections.length}:`);
        this.connections.forEach((block) => {
            console.log(`Block ${block.x},${block.y},${block.z}`);
        });
    }

    vertices = () => {
        const rval = [];
        
        rval.push(`${this.x},${this.y},${this.z}`);
        rval.push(`${this.x + this.edgeLength},${this.y},${this.z}`);
        rval.push(`${this.x},${this.y + this.edgeLength},${this.z}`);
        rval.push(`${this.x + this.edgeLength},${this.y + this.edgeLength},${this.z}`);
        
        
        rval.push(`${this.x},${this.y},${this.z + this.edgeLength}`);
        rval.push(`${this.x + this.edgeLength},${this.y},${this.z + this.edgeLength}`);
        rval.push(`${this.x},${this.y + this.edgeLength},${this.z + this.edgeLength}`);
        rval.push(`${this.x + this.edgeLength},${this.y + this.edgeLength},${this.z + this.edgeLength}`);

        return rval;
    }
}

doBlocksTouch = (blockA, blockB) => {
    let result;

    const blockAVertices = blockA.vertices();
    const blockBVertices = blockB.vertices();

    let countOfCommonVertices = 0;

    blockAVertices.forEach((vertex) => {
        if (blockBVertices.indexOf(vertex) >= 0) {
            countOfCommonVertices++;
        }
    });

    result = countOfCommonVertices >= 4;

    if (debug >= DEBUG.INFO) {
        console.log(`Block at ${blockA.x},${blockA.y},${blockA.z} and Block at ${blockB.x},${blockB.y},${blockB.z} ${result === true ? 'touch' : 'do not touch'}`);
    }

    return result;
}

markOuterSpace = (block) => {
    outerSpaceCount++;
    // Given this known outer space block, spread like a virus and update all connecting AIR blocks to OUTER_SPACE
    block.type = TYPE.OUTER_SPACE;

    block.connections.forEach((connection) => {
        if (connection.type === TYPE.AIR) {
            connection.connections = connection.connections.filter((c) => {
                return !block.equals(c);
            });

            markOuterSpace(connection);
        }
    });
}

destroyOuterSpaceInAir = () => {
    markOuterSpace(starterBlock);

    air = air.filter((block) => {
        return block.type === TYPE.AIR;
    });
}

calculateSurfaceArea = () => {
    let surfaceArea = 0;

    blocks.forEach((block) => {
        if (debug >= DEBUG.TRACE) {
            block.print();
        }
        surfaceArea += (6 - block.connections.length);
    });

    return surfaceArea;
}

calculateSurfaceAreaOfAir = () => {
    let surfaceArea = 0;

    air.forEach((block) => {
        if (debug >= DEBUG.TRACE) {
            block.print();
        }
        
        if (block.type === TYPE.AIR) {
            let airConnections = 0;
            block.connections.forEach((connection) => {
                if (connection.type === TYPE.AIR) {
                    airConnections++;
                }
            });
            surfaceArea += (6 - airConnections);
        }
    });

    return surfaceArea;
}

parseLine = (line) => {
    const coords = line.split(',');
    let newBlock = new Block(Number.parseInt(coords[0], 10), Number.parseInt(coords[1], 10), Number.parseInt(coords[2], 10), TYPE.BLOCK);
    blocks.push(newBlock);

    if (newBlock.x < minX) {
        minX = newBlock.x;
    }

    if (newBlock.x > maxX) {
        maxX = newBlock.x;
    }

    if (newBlock.y < minY) {
        minY = newBlock.y;
    }

    if (newBlock.y > maxY) {
        maxY = newBlock.y;
    }

    if (newBlock.z < minZ) {
        minZ = newBlock.z;
    }

    if (newBlock.z > maxZ) {
        maxZ = newBlock.z;
    }
};

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('./input.txt')
});

lineReader.on('line', (line) => {
    parseLine(line);
}).on('close', () => {

    blocks.forEach((blockA) => {
        blocks.forEach((blockB) => {
            if (!blockA.equals(blockB)) {
                if (doBlocksTouch(blockA, blockB)) {
                    if (blockA.connections.indexOf(blockB) === -1) {
                        blockA.connections.push(blockB);
                    }
                    if (blockB.connections.indexOf(blockA) === -1) {
                        blockB.connections.push(blockA);
                    }
                }
            }
        });
    });

    console.log(`Min X is ${minX}`);
    console.log(`Max X is ${maxX}`);
    console.log(`Min Y is ${minY}`);
    console.log(`Min Y is ${maxY}`);
    console.log(`Min Z is ${minZ}`);
    console.log(`Min Z is ${maxZ}`);

    for (let x = minX; x <= maxX; x++) {
        for (let y = minY; y <= maxY; y++) {
            for (let z = minZ; z <= maxZ; z++) {
                let newAir = new Block(x, y, z, TYPE.AIR);
                blocks.forEach((block) => {
                    if (block.equals(newAir)) {
                        newAir.type = TYPE.BLOCK;
                    }
                });

                air.push(newAir);

                // Set the starter block to the origin (known OUTER SPACE)
                if (x === 0 && y === 0 && z === 0) {
                    starterBlock = newAir;
                }
            }
        }
    }

    air.forEach((blockA) => {
        air.forEach((blockB) => {
            if (!blockA.equals(blockB)) {
                if (doBlocksTouch(blockA, blockB)) {
                    if (blockA.connections.indexOf(blockB) === -1) {
                        blockA.connections.push(blockB);
                    }
                    if (blockB.connections.indexOf(blockA) === -1) {
                        blockB.connections.push(blockA);
                    }
                }
            }
        });
    });

    //const surfaceArea = calculateSurfaceArea();

    //console.log(`Total surface area is ${surfaceArea}`);

    console.log(`There are ${air.length} air blocks.`);

    destroyOuterSpaceInAir();

    let blockSurfaceArea = calculateSurfaceArea();
    let airSurfaceArea = calculateSurfaceAreaOfAir();

    console.log(`Surface area is ${blockSurfaceArea - airSurfaceArea}`);
});