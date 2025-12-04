export class Button {
    value: string;
    up: Button | null;
    down: Button | null;
    left: Button | null;
    right: Button | null;

    constructor(value: string) {
        this.value = value;
        this.up = null;
        this.down = null;
        this.left = null;
        this.right = null;
    }

    setUp(button: Button) {
        this.up = button;
    }

    setDown(button: Button) {
        this.down = button;
    }

    setLeft(button: Button) {
        this.left = button;
    }

    setRight(button: Button) {
        this.right = button;
    }

    getValue(): string {
        return this.value;
    }
}

export class Keypad {
    buttons: Button[][];
    currentButton: Button;

    constructor() {
        this.buttons = [];

        // Keypad layout is now:
        //    1
        //  2 3 4
        //5 6 7 8 9
        //  A B C
        //    D

        this.buttons.push([null, null, new Button('1'), null, null]);
        this.buttons.push([null, new Button('2'), new Button('3'), new Button('4'), null]);
        this.buttons.push([new Button('5'), new Button('6'), new Button('7'), new Button('8'), new Button('9')]);
        this.buttons.push([null, new Button('A'), new Button('B'), new Button('C'), null]);
        this.buttons.push([null, null, new Button('D'), null, null]);

        // Create the connections between the buttons
        this.establishConnections();

        // Start with the 5 key
        this.setCurrentButton(this.buttons[2][0]);
    }

    establishConnections() {
        this.buttons.forEach((row, y) => {
            row.forEach((tile, x) => {
                if (tile === null) {
                    return;
                }

                if (y > 0) {
                    tile.up = this.buttons[y - 1][x];
                }

                if (y < this.buttons.length - 1) {
                    tile.down = this.buttons[y + 1][x];
                }

                if (x > 0) {
                    tile.left = this.buttons[y][x - 1];
                }

                if (x < row.length - 1) {
                    tile.right = this.buttons[y][x + 1];
                }
            });
        });
    }

    setCurrentButton(button: Button) {
        this.currentButton = button;
    }

    getCurrentButton(): Button {
        return this.currentButton;
    }

    move(direction: string) {
        switch (direction) {
            case 'U':
                if (this.currentButton.up === null) {
                    return;
                }
                this.currentButton = this.currentButton.up;
                break;
            case 'D':
                if (this.currentButton.down === null) {
                    return;
                }
                this.currentButton = this.currentButton.down;
                break;
            case 'L':
                if (this.currentButton.left === null) {
                    return;
                }
                this.currentButton = this.currentButton.left;
                break;
            case 'R':
                if (this.currentButton.right === null) {
                    return;
                }
                this.currentButton = this.currentButton.right;
                break;
            default:
                throw new Error('Invalid direction');
        }
    }

    followDirectionsAndReturnCode(directions: string): string {
        directions.split('').forEach((direction) => {
            this.move(direction);
        });
        return this.currentButton.getValue();
    }
}