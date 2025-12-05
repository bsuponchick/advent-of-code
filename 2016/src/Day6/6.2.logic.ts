export class SignalDecoder {
    signals: string[];
    columnCounts: { [key: string]: number }[];

    constructor(signals: string[]) {
        this.signals = signals;
        this.columnCounts = [];

        this.parseSignals();
    }

    parseSignals(): void {
        this.signals.forEach((signal) => {
            signal.split('').forEach((char, index) => {
                if (!this.columnCounts[index]) {
                    this.columnCounts[index] = {};
                }

                this.columnCounts[index][char] = (this.columnCounts[index][char] || 0) + 1;
            });
        });
    }

    decode(): string {
        let decodedMessage = '';

        this.columnCounts.forEach((columnCount) => {
            const leastCommonChar = Object.keys(columnCount).reduce((a, b) => columnCount[a] < columnCount[b] ? a : b);
            decodedMessage += leastCommonChar;
        });

        return decodedMessage;
    }
}