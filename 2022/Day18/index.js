const DEBUG = {
    ALL: 3,
    TRACE: 2,
    INFO: 1,
    NONE: 0
};

let debug = DEBUG.NONE;
const blocks = [];

class Block {
    constructor (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.connections = [];
        this.edgeLength = 1;
    }
    
    equals = (block) => {
        return (this.x === block.x) && (this.y === block.y) && (this.z === block.z);
    }

    print = () => {
        console.log(`>>> Block ${this.x},${this.y},${this.z} <<<`);
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

parseLine = (line) => {
    const coords = line.split(',');
    blocks.push(new Block(Number.parseInt(coords[0], 10), Number.parseInt(coords[1], 10), Number.parseInt(coords[2], 10)));
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

    const surfaceArea = calculateSurfaceArea();

    console.log(`Total surface area is ${surfaceArea}`);
});