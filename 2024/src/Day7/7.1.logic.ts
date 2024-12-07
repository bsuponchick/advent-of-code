export class TreeNode {
    parent: TreeNode | null;
    children: TreeNode[];
    operator: string | null;
    value: number;

    constructor (value: number, operator: string | null) {
        this.value = value;
        this.operator = operator;
        this.children = [];
    }

    populate (values: number[]): void {
        if (values.length === 0) {
            return;
        }

        const operators = ['+', '*'];

        const copyOfValues = [...values];
        const value = copyOfValues.shift();

        operators.forEach((operator) => {
            const node = new TreeNode(value, operator);
            this.children.push(node);
            node.populate(copyOfValues);
        });
    }

    addChild (child: TreeNode) {
        child.setParent(this);
        this.children.push(child);
    }

    setParent (parent: TreeNode) {
        this.parent = parent;
    }

    evaluate (desiredResult: number, accumulator: number): boolean {
        let currentValue = accumulator;

        if (this.operator === '+') {
            currentValue += this.value;
        } else if (this.operator === '*') {
            currentValue *= this.value;
        } else if (this.operator === null) {
            currentValue = this.value;
        }

        if (this.children.length === 0) {
            //console.log(`No more children, current value: ${currentValue}`);
            return currentValue === desiredResult;
        }

        if (currentValue > desiredResult) {
            return false;
        }

        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].evaluate(desiredResult, currentValue)) {
                return true;
            }
        }

        return false;
    }
}

export class Equation {
    outcome: number;
    values: number[];

    constructor (line: string) {
        this.values = [];

        this.parse(line);
    }

    parse (line: string): void {
        const parts = line.split(' ');
        
        parts.forEach((part, index) => {
            if (index === 0) {
                this.outcome = parseInt(part.slice(0, part.length - 1));
            } else {
                this.values.push(parseInt(part));
            }
        });
    }

    evaluate (): boolean {
        const copyOfValues = [...this.values];
        const rootValue = copyOfValues.shift();

        const root = new TreeNode(rootValue, null);
        root.populate(copyOfValues);

        return root.evaluate(this.outcome, 0);
    }
}