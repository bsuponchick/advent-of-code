export class PuzzlePiece {
    id: string;
    shape: string[];

    constructor(id: string, shape: string[]) {
        this.id = id;
        this.shape = shape;
    }

    getShape(): string[] {
        return this.shape;
    }

    setShape(shape: string[]) {
        this.shape = shape;
    }
    
    getID(): string {
        return this.id;
    }

    area(): number {
        let area = 0;
        this.shape.forEach((row) => {
            row.split('').forEach((cell) => {
                if (cell === '#') {
                    area++;
                }
            });
        });

        return area;
    }

    print(): void {
        let output = `Puzzle Piece ${this.id}:\n`;
        output += `Area: ${this.area()}\n`;
        output += `========================================\n`;
        this.shape.forEach((row) => {
            output += row;
            output += '\n';
        });
        output += `========================================\n`;
        console.log(output);
    }

    rotate(): void {
        // Rotate the shape 90 degrees clockwise
        //  ###      ###      ###      #.#
        //  #..  ->  #.#  ->  ..#  ->  #.#
        //  ###      #.#      ###      ###

        let newShape: string[] = [];
        
        // Take advantage fo the fact that all shapes are 3x3 squares
        newShape.push(`${this.shape[2].charAt(0)}${this.shape[1].charAt(0)}${this.shape[0].charAt(0)}`);
        newShape.push(`${this.shape[2].charAt(1)}${this.shape[1].charAt(1)}${this.shape[0].charAt(1)}`);
        newShape.push(`${this.shape[2].charAt(2)}${this.shape[1].charAt(2)}${this.shape[0].charAt(2)}`);

        this.shape = newShape;
    }
}

interface GridSize {
    height: number;
    width: number;
}

export class Grid {
    grid: string[][];
    goal: number[];
    size: GridSize;

    constructor(size: GridSize, goal: number[]) {
        this.grid = [];
        this.goal = goal;
        this.size = size;
    }

    print(): void {
        let output = '';
        this.grid.forEach((row) => {
            output += row.join('');
            output += '\n';
        });
        console.log(output);
    }

    calculateAreaOfGrid(): number {
        return this.size.height * this.size.width;
    }

    calculateAreaOfGoal(puzzlePieces: PuzzlePiece[]): number {
        let area = 0;
        this.goal.forEach((goal, index) => {
            area += puzzlePieces[index].area() * goal;
        });
        return area;
    }

    calculateAreaOfBestPossibleFit() : number {
        let area = 0;
        this.goal.forEach((goal) => {
            area += 9 * goal;
        });
        return area;
    }
}