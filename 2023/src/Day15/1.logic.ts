export class Box {
    lenses: string[] = [];
    id: number = 0;

    constructor(id: number) {
        this.id = id;
    }

    containsLabel = (label: string): boolean => {
        return this.indexOfLensWithLabel(label) !== -1;
    };

    indexOfLensWithLabel = (label: string): number => {
        let lensIndex = -1;

        this.lenses.forEach((lens, i) => {
            if (lens.substring(0, lens.indexOf(' ')) === label.substring(0, label.indexOf(' '))) {
                lensIndex = i;
            }
        });

        return lensIndex;
    }

    addLabel = (label: string) => {
        const indexOfLensWithLabel = this.indexOfLensWithLabel(label);
        if (indexOfLensWithLabel === -1) {
            this.lenses.push(label);
        } else {
            this.lenses[indexOfLensWithLabel] = label;
        }
    }

    removeLabel = (label: string) => {
        const indexOfLensWithLabel = this.indexOfLensWithLabel(label);
        if (indexOfLensWithLabel !== -1) {
            this.lenses.splice(indexOfLensWithLabel, 1);
        }
    }

    calculateFocusingPower = (): number => {
        let focusingPower = 0;

        this.lenses.forEach((lens, index) => {
            const [label, focalLength] = lens.split(' ');
            
            const powerForLens = (this.id + 1) * (index + 1) * (parseInt(focalLength, 10));
            focusingPower += powerForLens;
        });

        return focusingPower;
    }

    isEmpty = (): boolean => {
        return this.lenses.length === 0;
    }
}

export const determineAscii = (input: string) => {
    return input.charCodeAt(0);
};

export const executeHashAlgorithm = (input: string) => {
    let currentValue = 0;

    input.split('').forEach((char) => {
        currentValue += determineAscii(char);
        currentValue *= 17;
        currentValue %= 256;
    });

    return currentValue;
};

