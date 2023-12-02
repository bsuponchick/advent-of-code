export const isValid = (game: string): boolean => {
    const MAX_VALUES = {
        red: 12,
        green: 13,
        blue: 14
    };

    const noGameNumber = game.slice(game.indexOf(': ') + 2);
    const combos = noGameNumber.split('; ');
    
    let gameValid = true;

    combos.forEach((combo) => {
        let dice: string[] = [];

        if (combo.indexOf(', ') > -1) {
            dice = combo.split(', ');
        } else {
            dice = [combo];
        }

        dice.forEach((die) => {
            const [value, color] = die.split(' ');
            const intValue = parseInt(value, 10);

            if (intValue > MAX_VALUES[color]) {
                gameValid = false;
            }
        });
    });

    return gameValid;
}