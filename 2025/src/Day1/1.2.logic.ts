export class Lock {
    position: number;
    min: number;
    max: number;
    goal: number;

    constructor(args: { position: number, min: number, max: number, goal: number }) {
        this.position = args.position;
        this.min = args.min;
        this.max = args.max;
        this.goal = args.goal;
    }

    // should return the number of times the lock reached the goal while wrapping around
    turnLeft(amount: number): number {
        // The min and max are valid positions, if we turn left past the min we wrap to the max.  This should include
        // the case where we may wrap around multiple times.
        if (this.position - amount < this.min) {
            const remaining = amount - (this.position - this.min);
            
            if (this.isGoal()) {
                this.position = this.max - ((remaining - 1) % (this.max - this.min + 1));
                return amount < this.max - this.min ? 0 : Math.ceil((remaining) / (this.max - this.min + 1));
            }

            this.position = this.max - ((remaining - 1) % (this.max - this.min + 1));
            let rval = Math.ceil((remaining) / (this.max - this.min + 1));
            return rval;
        } else {
            this.position = this.position - amount;
            if (amount > 0) {
                return this.isGoal() ? 1 : 0;
            }
            return 0;
        }
    }

    // should return the number of times the lock reached the goal while wrapping around
    turnRight(amount: number): number {
        // The min and max are valid positions, if we turn right past the max we wrap to the min.  This should include
        // the case where we may wrap around multiple times.
        if (this.position + amount > this.max) {
            let remaining = amount - (this.max - this.position);
            if (this.isGoal()) {
                this.position = this.min + ((remaining - 1) % (this.max - this.min + 1));
                return amount < this.max - this.min ? 0 : Math.ceil((remaining) / (this.max - this.min + 1));
            }

            this.position = this.min + ((remaining - 1) % (this.max - this.min + 1));
            let rval = Math.ceil((remaining) / (this.max - this.min + 1));
            return rval;
        } else {
            this.position = this.position + amount;
            if (amount > 0) {
                return this.isGoal() ? 1 : 0;
            }
            return 0;
        }
    }
    
    isGoal(): boolean {
        return this.position === this.goal;
    }
}