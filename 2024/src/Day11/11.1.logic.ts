export class Stone {
    engraving: number;

    constructor(engraving: number) {
        this.engraving = engraving;
    }

    transform(): Stone[] {
        if (this.engraving === 0) {
            return [new Stone(1)];
        } else if (`${this.engraving}`.length % 2 === 0) {
            let half = `${this.engraving}`.length / 2;
            let left = parseInt(`${this.engraving}`.slice(0, half), 10);
            let right = parseInt(`${this.engraving}`.slice(half), 10);

            return [new Stone(left), new Stone(right)];
        } else {
            return [new Stone(this.engraving * 2024)];
        }
    }
}