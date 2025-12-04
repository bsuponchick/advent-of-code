export class Button {
    value: number;
    up: Button | null;
    down: Button | null;
    left: Button | null;
    right: Button | null;

    constructor(value: number) {
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

    getValue(): number {
        return this.value;
    }
}

export class Keypad {
    buttons: Button[][];
    currentButton: Button;

    constructor() {
        this.buttons = [];

        this.buttons.push([new Button(1), new Button(2), new Button(3)]);
        this.buttons.push([new Button(4), new Button(5), new Button(6)]);
        this.buttons.push([new Button(7), new Button(8), new Button(9)]);

        // Create the connections between the buttons
        this.establishConnections();

        // Start with the 5 key
        this.setCurrentButton(this.buttons[1][1]);
    }

    establishConnections() {
        this.buttons.forEach((row, y) => {
            row.forEach((tile, x) => {
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

    followDirectionsAndReturnCode(directions: string): number {
        directions.split('').forEach((direction) => {
            this.move(direction);
        });
        return this.currentButton.getValue();
    }
}