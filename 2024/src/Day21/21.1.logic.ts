class TreeNode {
    value: string;
    children: TreeNode[];

    constructor(value: string) {
        this.value = value;
        this.children = [];
    }

    addChild(value: string) {
        this.children.push(new TreeNode(value));
    }

    getConcatenationOfAllChildValues(): string[] {
        const concatenations = [];

        if (this.children.length === 0) {
            return [this.value];
        }

        this.children.forEach((child) => {
            const childConcatenations = child.getConcatenationOfAllChildValues();
            childConcatenations.forEach((childConcatenation) => {
                concatenations.push(`${this.value}${childConcatenation}`);
            });
        });

        return concatenations;
    }
}

class Tree {
    root: TreeNode;

    constructor() {
        this.root = null;
    }

    setRoot(node: TreeNode) {
        this.root = node;
    }

    getShortestConcatenationsToLeaf(): string[] {
        const shortestConcatenations = [];
        let shortestLength = Number.MAX_SAFE_INTEGER;

        const concatenations = this.root.getConcatenationOfAllChildValues();
        concatenations.sort((a, b) => a.length - b.length);

        shortestLength = concatenations[0].length;

        concatenations.forEach((concatenation) => {
            if (concatenation.length === shortestLength) {
                shortestConcatenations.push(concatenation);
            }
        });

        return shortestConcatenations;
    }
}

class Keypad {
    currentCharacter: string;

    constructor() {
        this.currentCharacter = 'A';
    }

    determinePathsToNode(startingId: string, targetId: string): string[] {
        return [];
    }

    determineShortestPathsForSequence(sequence: string): string[] {
        const tree = new Tree();

        tree.setRoot(new TreeNode(''));

        const children = this.determinePathToSequence(sequence, this.currentCharacter);
        children.forEach((child) => {
            tree.root.children.push(child);
        });

        return tree.getShortestConcatenationsToLeaf();
    }

    determinePathToSequence(sequence: string, currentCharacter: string): TreeNode[] {
        if (sequence.length === 0) {
            return [];
        }

        const treeNodes: TreeNode[] = [];

        const charactersInSequence = sequence.split('');
        const nextCharacter = charactersInSequence[0];

        const possiblePaths = this.determinePathsToNode(currentCharacter, nextCharacter);

        possiblePaths.forEach((path) => {
            const node = new TreeNode(path);
            node.children = this.determinePathToSequence(sequence.slice(1), nextCharacter);

            treeNodes.push(node);
        });

        return treeNodes;
    }
}

export class NumericKeyPad extends Keypad {
    constructor() {
        super();  
    }

    determinePathsToNode(startingId: string, targetId: string): string[] {
        switch (startingId) {
            case '1':
                switch (targetId) {
                    case '1':
                        return ['A'];
                    case '2':
                        return ['>A'];
                    case '3':
                        return ['>>A'];
                    case '4':
                        return ['^A'];
                    case '5':
                        return ['>^A', '^>A'];
                    case '6':
                        return ['>>^A', '>^>A', '^>>A'];
                    case '7':
                        return ['^^A'];
                    case '8':
                        return ['>^^A', '>^>A', '^^>A'];
                    case '9':
                        return ['>>^^A', '>^>^A', '>>^^A', '^^>>A', '^>>^A', '^>^>A'];
                    case '0':
                        return ['v>A', '>vA'];
                    case 'A':
                        return ['>>vA', '>v>A', 'v>>A'];
                    default:
                        return null;
                }
            case '2':
                switch (targetId) {
                    case '1':
                        return ['<A'];
                    case '2':
                        return ['A'];
                    case '3':
                        return ['>A'];
                    case '4':
                        return ['^<A', '<^A'];
                    case '5':
                        return ['^A'];
                    case '6':
                        return ['>^A', '^>A'];
                    case '7':
                        return ['^^<A', '^<^A', '<^^A'];
                    case '8':
                        return ['^^A'];
                    case '9':
                        return ['>^^A', '^>^A', '>^^A'];
                    case '0':
                        return ['vA'];
                    case 'A':
                        return ['>vA', 'v>A'];
                    default:
                        return null;
                }
            case '3':
                switch (targetId) {
                    case '1':
                        return ['<<A'];
                    case '2':
                        return ['<A'];
                    case '3':
                        return ['A'];
                    case '4':
                        return ['^<<A', '<^<A', '<<^A'];
                    case '5':
                        return ['^<A', '<^A'];
                    case '6':
                        return ['^A'];
                    case '7':
                        return ['^^<<A', '^<^<A', '<<^^A', '<^<^A'];
                    case '8':
                        return ['^^<A', '^<^A', '<<^A'];
                    case '9':
                        return ['^^A'];
                    case 'A':
                        return ['vA'];
                    default:
                        return null;
                }
            case '4':
                switch (targetId) {
                    case '1':
                        return ['vA'];
                    case '2':
                        return ['>vA', 'v>A'];
                    case '3':
                        return ['>>vA', '>v>A', 'v>>A'];
                    case '4':
                        return ['A'];
                    case '5':
                        return ['>A'];
                    case '6':
                        return ['>>A'];
                    case '7':
                        return ['^A'];
                    case '8':
                        return ['>^A', '^>A'];
                    case '9':
                        return ['>>^A', '>^>A', '^>>A'];
                    case '0':
                        return ['>vvA', 'v>vA', 'vv>A'];
                    case 'A':
                        return ['>>vvA', '>v>vA', 'vv>>A', 'v>v>A'];
                    default:
                        return null;
                }
            case '5':
                switch (targetId) {
                    case '1':
                        return ['v<A', '<vA'];
                    case '2':
                        return ['vA'];
                    case '3':
                        return ['>vA', 'v>A'];
                    case '4':
                        return ['<A'];
                    case '5':
                        return ['A'];
                    case '6':
                        return ['>A'];
                    case '7':
                        return ['^<A', '<^A'];
                    case '8':
                        return ['^A'];
                    case '9':
                        return ['>^A', '^>A'];
                    case '0':
                        return ['vvA'];
                    case 'A':
                        return ['>vvA', 'v>vA', 'vv>A'];
                    default:
                        return null;
                }
            case '6':
                switch (targetId) {
                    case '1':
                        return ['v<<A', '<v<A', '<<vA'];
                    case '2':
                        return ['v<A', '<vA'];
                    case '3':
                        return ['vA'];
                    case '4':
                        return ['<<A'];
                    case '5':
                        return ['<A'];
                    case '6':
                        return ['A'];
                    case '7':
                        return ['^<<A', '<^<A', '<<^A'];
                    case '8':
                        return ['^<A', '<^A'];
                    case '9':
                        return ['^A'];
                    case '0':
                        return ['vv<A', 'v<vA', '<vvA'];
                    case 'A':
                        return ['vvA'];
                    default:
                        return null;
                }
            case '7':
                switch (targetId) {
                    case '1':
                        return ['vvA'];
                    case '2':
                        return ['>vvA', 'v>vA', 'vv>A'];
                    case '3':
                        return ['>>vvA', '>v>vA', 'vv>>A', 'v>v>A'];
                    case '4':
                        return ['vA'];
                    case '5':
                        return ['>vA', 'v>A'];
                    case '6':
                        return ['>>vA', '>v>A', 'v>>A'];
                    case '7':
                        return ['A'];
                    case '8':
                        return ['>A'];
                    case '9':
                        return ['>>A'];
                    case '0':
                        return ['>vvvA', 'v>vvA', 'vv>vA', 'vvv>A'];
                    case 'A':
                        return ['>>vvvA', '>v>vvA', '>vv>vA', '>vvv>A', 'vv>>vA', 'vv>v>A', 'vvv>>A', 'v>v>>A'];
                    default:
                        return null;
                }
            case '8':
                switch (targetId) {
                    case '1':
                        return ['vv<A', 'v<vA', '<vvA'];
                    case '2':
                        return ['vvA'];
                    case '3':
                        return ['>vvA', 'v>vA', 'vv>A'];
                    case '4':
                        return ['v<A', '<vA'];
                    case '5':
                        return ['vA'];
                    case '6':
                        return ['>vA', 'v>A'];
                    case '7':
                        return ['<A'];
                    case '8':
                        return ['A'];
                    case '9':
                        return ['>A'];
                    case '0':
                        return ['vvvA'];
                    case 'A':
                        return ['>vvvA', 'v>vvA', 'vv>vA', 'vvv>A'];
                    default:
                        return null;
                }
            case '9':
                switch (targetId) {
                    case '1':
                        return ['vv<<A', 'v<v<A', '<v<vA', '<<vvA'];
                    case '2':
                        return ['vv<A', 'v<vA', '<vvA'];
                    case '3':
                        return ['vvA'];
                    case '4':
                        return ['v<<A', '<v<A', '<<vA'];
                    case '5':
                        return ['v<A', '<vA'];
                    case '6':
                        return ['vA'];
                    case '7':
                        return ['<<A'];
                    case '8':
                        return ['<A'];
                    case '9':
                        return ['A'];
                    case '0':
                        return ['vvv<A', 'v<vvA', 'vv<vA', '<vvvA'];
                    case 'A':
                        return ['vvvA'];
                    default:
                        return null;
                }
            case '0':
                switch (targetId) {
                    case '1':
                        return ['^<A', '<^A'];
                    case '2':
                        return ['^A'];
                    case '3':
                        return ['>^A', '^>A'];
                    case '4':
                        return ['^^<A', '^<^A', '<^^A'];
                    case '5':
                        return ['^^A'];
                    case '6':
                        return ['>^^A', '^>^A', '^^>A'];
                    case '7':
                        return ['^^^<A', '^<^^A', '^^<^A', '<^^^A'];
                    case '8':
                        return ['^^^A'];
                    case '9':
                        return ['>^^^A', '^>^^A', '^^>^A', '^^^>A'];
                    case '0':
                        return ['A'];
                    case 'A':
                        return ['>A'];
                    default:
                        return null;
                }
            case 'A':
                switch (targetId) {
                    case '1':
                        return ['^<<A', '<^<A', '<<^A'];
                    case '2':
                        return ['^<A', '<^A'];
                    case '3':
                        return ['^A'];
                    case '4':
                        return ['^^<<A', '^<^<A', '<^<^A', '<<^^A'];
                    case '5':
                        return ['^^<A', '^<^A', '<^^A'];
                    case '6':
                        return ['^^A'];
                    case '7':
                        return ['^^^<<A', '^^<<^A', '^<<^^A', '<<^^^A', '<^<^^A', '^^<^<A', '<^^<^A', '<^^^<A'];
                    case '8':
                        return ['^^^<A', '^^<^A', '^<^^A', '<^^^A'];
                    case '9':
                        return ['^^^A'];
                    case '0':
                        return ['<A'];
                    case 'A':
                        return ['A'];
                    default:
                        return null;
                }
            default:
                return null;
        }
    }
}

export class DirectionalKeypad extends Keypad {
    constructor() {
        super();
    }

    determinePathsToNode(startingId: string, targetId: string): string[] {
        switch (startingId) {
            case '<':
                switch (targetId) {
                    case '<':
                        return ['A'];
                    case 'v':
                        return ['>A'];
                    case '^':
                        return ['>^A'];
                    case '>':
                        return ['>>A'];
                    case 'A':
                        return ['>>^A', '>^>A'];
                    default:
                        return null;
                }
            case 'v':
                switch (targetId) {
                    case 'v':
                        return ['A'];
                    case '<':
                        return ['<A'];
                    case '>':
                        return ['>A'];
                    case '^':
                        return ['^A'];
                    case 'A':
                        return ['>^A', '^>A'];
                    default:
                        return null;
                }
            case '>':
                switch (targetId) {
                    case '>':
                        return ['A'];
                    case 'v':
                        return ['<A'];
                    case '<':
                        return ['<<A'];
                    case '^':
                        return ['<^A', '^<A'];
                    case 'A':
                        return ['^A'];
                    default:
                        return null;
                }
            case '^':
                switch (targetId) {
                    case '^':
                        return ['A'];
                    case '<':
                        return ['v<A'];
                    case 'v':
                        return ['vA'];
                    case '>':
                        return ['v>A', '>vA'];
                    case 'A':
                        return ['>A'];
                    default:
                        return null;
                }
            case 'A':
                switch (targetId) {
                    case 'A':
                        return ['A'];
                    case '^':
                        return ['<A'];
                    case 'v':
                        return ['<vA', 'v<A'];
                    case '<':
                        return ['v<<A', '<v<A'];
                    case '>':
                        return ['vA'];
                    default:
                        return null;
                }
            default:
                return null;
        }
    }
}