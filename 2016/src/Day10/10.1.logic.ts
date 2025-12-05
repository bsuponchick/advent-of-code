interface MicrochipTarget {
    addMicrochip(Microchip: Microchip): void;
}

export class Microchip {
    value: number;

    constructor(value: number) {
        this.value = value;
    }
}

export class Bot implements MicrochipTarget {
    id: number;
    lowGoalId: number;
    highGoalId: number;
    low: Microchip | null;
    high: Microchip | null;
    lowTarget: MicrochipTarget | null;
    highTarget: MicrochipTarget | null;

    constructor(id: number, lowGoalId: number, highGoalId: number) {
        this.id = id;
        this.low = null;
        this.high = null;
        this.lowTarget = null;
        this.highTarget = null;
        this.lowGoalId = lowGoalId;
        this.highGoalId = highGoalId;
    }

    addMicrochip(Microchip: Microchip) {
        if (this.low === null) {
            this.low = Microchip;
        } else if (this.high === null) {
            if (Microchip.value < this.low.value) {
                this.high = this.low;
                this.low = Microchip;
            } else {
                this.high = Microchip;
            }

            // Now the bot is full so we need to send the microchips to its targets
            if ((this.low.value === this.lowGoalId) && (this.high.value === this.highGoalId)) {
                console.log(`Bot ${this.id} is the winner!`);
            }
            
            if (this.lowTarget !== null) {
                this.lowTarget.addMicrochip(this.low);
                this.low = null;
            }
            if (this.highTarget !== null) {
                this.highTarget.addMicrochip(this.high);
                this.high = null;
            }
        }
    }

    getLowMicrochip(): Microchip | null {
        return this.low;
    }

    getHighMicrochip(): Microchip | null {
        return this.high;
    }

    setLowTarget(target: MicrochipTarget) {
        this.lowTarget = target;
    }

    setHighTarget(target: MicrochipTarget) {
        this.highTarget = target;
    }

    getLowTarget(): MicrochipTarget | null {
        return this.lowTarget;
    }

    getHighTarget(): MicrochipTarget | null {
        return this.highTarget;
    }
}

export class Bin implements MicrochipTarget {
    id: number;
    microchips: Microchip[];

    constructor(id: number) {
        this.id = id;
        this.microchips = [];
    }

    addMicrochip(Microchip: Microchip) {
        this.microchips.push(Microchip);
    }

    getMicrochips(): Microchip[] {
        return this.microchips;
    }
}