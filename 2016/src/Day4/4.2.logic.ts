export class Room {
    name: string;
    sectorId: number;
    checksum: string;

    constructor(input: string) {
        const parts = input.split('-');
        const sectorId = parts[parts.length - 1].split('[')[0];
        const checksum = parts[parts.length - 1].split('[')[1].replace(']', '');
        const name = parts.slice(0, -1).join('-');


        this.name = name;
        this.sectorId = Number(sectorId);
        this.checksum = checksum;
    }

    isValid(): boolean {
        const counts: { [key: string]: number } = {};
        this.name.split('').forEach((char) => {
            if (char !== '-') {
                counts[char] = (counts[char] || 0) + 1;
            }
        });

        // Need to handle ties by sorting those segments in alphabetical order
        const sortedCounts = Object.entries(counts).sort((a, b) => {
            if (a[1] === b[1]) {
                return a[0].localeCompare(b[0]);
            }
            return b[1] - a[1];
        });

        // Get the top 5 most common characters
        const top5 = sortedCounts.slice(0, 5).map(([char]) => char);        

        return top5.join('') === this.checksum;
    }

    decryptName(): string { 
        let decryptedName = '';

        this.name.split('').forEach((char) => {
            if (char === '-') {
                decryptedName += ' ';
            } else {
                decryptedName += String.fromCharCode((char.charCodeAt(0) - 97 + this.sectorId) % 26 + 97);
            }
        });

        return decryptedName;
    }
}