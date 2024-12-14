export interface Coordinate {
    x: number;
    y: number;
}

export interface ButtonPress {
    x: number;
    y: number;
}

const MAX_BUTTON_PRESSES: number = 100;

export class ClawMachine {
    goal: Coordinate;
    aButtonPress: ButtonPress;
    bButtonPress: ButtonPress;

    constructor(goal: Coordinate, aButtonPress: ButtonPress, bButtonPress: ButtonPress) {
        this.goal = goal;
        this.aButtonPress = aButtonPress;
        this.bButtonPress = bButtonPress;
    }

    determinant(matrix) {
        if (matrix.length !== matrix[0].length) {
          throw new Error("Matrix must be square.");
        }
      
        if (matrix.length === 2) {
          // 2x2 matrix determinant
          return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        } else {
          // For larger matrices, use Laplace expansion
          let det = 0;
          for (let i = 0; i < matrix.length; i++) {
            const minor = matrix.slice(1).map(row => row.filter((_, j) => j !== i));
            det += matrix[0][i] * this.determinant(minor) * (i % 2 === 0 ? 1 : -1);
          }
          return det;
        }
      }
      
      cramersRule(A, b) {
        const n = A.length;
        const detA = this.determinant(A);
      
        if (detA === 0) {
          throw new Error("System has no unique solution.");
        }
      
        const solutions = [];
        for (let i = 0; i < n; i++) {
          const Ai = A.map((row, j) => row.map((el, k) => (k === i ? b[j] : el)));
          solutions.push(this.determinant(Ai) / detA);
        }

        solutions.forEach((solution, index) => {
            if (!Number.isInteger(solution)) {
                throw new Error("System has no unique solution.");
            }
        });
      
        return solutions;
      }

    calculateCheapestPathToGoal(): number {
        const coefficients = [
            [this.aButtonPress.x, this.bButtonPress.x],
            [this.aButtonPress.y, this.bButtonPress.y]
        ];

        const constants = [this.goal.x, this.goal.y];

        const solutions = this.cramersRule(coefficients, constants);

        console.log(`Solutions: ${JSON.stringify(solutions)}`);
        return solutions[0] * 3 + solutions[1];
    }

}