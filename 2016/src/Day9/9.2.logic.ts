export class Decompressor {
    public static decompress(input: string): number {
        let mungedInput = input.replace(' ', '').split('');
        let decompressedLength = 0;

        while (mungedInput.length > 0) {
            let firstChar = mungedInput[0];

            if (firstChar === '(') {
                // This is a marker
                const indexOfClosingBracket = mungedInput.indexOf(')');

                // Check for nested markers
                if (mungedInput[indexOfClosingBracket + 1] === '(') {
                    // This is a nested marker
                    const marker = mungedInput.slice(1, indexOfClosingBracket).join('');
                    const [repeatCount, times] = marker.split('x');

                    const nestedMarker = mungedInput.slice(indexOfClosingBracket + 1, indexOfClosingBracket + 1 + Number(repeatCount)).join('');
                    const nestedMarkerSize = Decompressor.decompress(mungedInput.slice(indexOfClosingBracket + 1, indexOfClosingBracket + 1 + Number(repeatCount)).join(''));

                    decompressedLength += Number(times) * nestedMarkerSize;
                    mungedInput.slice(indexOfClosingBracket + 1, indexOfClosingBracket + 1 + Number(repeatCount));

                    mungedInput = mungedInput.slice(indexOfClosingBracket + 1 + Number(repeatCount));
                } else {
                    const marker = mungedInput.slice(1, indexOfClosingBracket).join('');
                    const [repeatCount, times] = marker.split('x');

                    decompressedLength += Number(times) * Number(repeatCount);
                    mungedInput.slice(indexOfClosingBracket + 1, indexOfClosingBracket + 1 + Number(repeatCount));

                    mungedInput = mungedInput.slice(indexOfClosingBracket + 1 + Number(repeatCount));
                }
            } else {
                decompressedLength += 1;
                mungedInput.shift();
            }
        }

        return decompressedLength;
    }
}