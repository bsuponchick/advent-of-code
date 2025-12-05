export class Decompressor {
    public static decompress(input: string): string {
        let mungedInput = input.replace(' ', '').split('');
        let decompressed = '';

        while (mungedInput.length > 0) {
            let firstChar = mungedInput.shift();

            if (firstChar === '(') {
                // This is a marker
                const indexOfClosingBracket = mungedInput.indexOf(')');

                const marker = mungedInput.slice(0, indexOfClosingBracket).join('');
                const [repeatCount, times] = marker.split('x');

                for (let i = 0; i < Number(times); i++) {
                    decompressed += mungedInput.slice(indexOfClosingBracket + 1, indexOfClosingBracket + 1 + Number(repeatCount)).join('');
                }

                mungedInput = mungedInput.slice(indexOfClosingBracket + 1 + Number(repeatCount));
            } else {
                decompressed += firstChar;
            }
        }

        return decompressed;
    }
}