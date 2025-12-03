export class Lock {
    position: number;
    min: number;
    max: number;

    constructor(args: { position: number, min: number, max: number }) {
        this.position = args.position;
        this.min = args.min;
        this.max = args.max;
    }

    turnLeft(amount: number): void {
        // The min and max are valid positions, if we turn left past the min we wrap to the max.  This should include
        // the case where we may wrap around multiple times.
        if (this.position - amount < this.min) {
            let remaining = amount - (this.position - this.min);
            this.position = this.max - ((remaining - 1) % (this.max - this.min + 1));
        } else {
            this.position = this.position - amount;
        }
    }

    turnRight(amount: number): void {
        // The min and max are valid positions, if we turn right past the max we wrap to the min.  This should include
        // the case where we may wrap around multiple times.
        if (this.position + amount > this.max) {
            let remaining = amount - (this.max - this.position);
            this.position = this.min + ((remaining - 1) % (this.max - this.min + 1));
        } else {
            this.position = this.position + amount;
        }
    }
}