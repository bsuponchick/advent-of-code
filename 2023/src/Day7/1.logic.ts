const cardStrengths = ['2', '3', '4', '5', '6','7', '8', '9', 'T', 'J', 'Q', 'K', 'A'];
export enum Type {
    FiveOfAKind = 7,
    FourOfAKind = 6,
    FullHouse = 5,
    ThreeOfAKind = 4,
    TwoPairs = 3,
    OnePair = 2,
    HighCard = 1
}

export class Hand {
    cards: string = '';
    bid: number = 0;
    type: Type = Type.HighCard;

    constructor(cards: string, bid: number) {
        this.cards = cards;
        this.bid = bid;
        this.type = determineType(cards);
    }
}

export const determineType = (cards: string): Type => {
    const individualCards: string[] = cards.split('');
    
    const matches: { [key: string]: number } = {};

    individualCards.forEach((card) => {
        if (matches[card]) {
            matches[card]++;
        } else {
            matches[card] = 1;
        }
    });

    const matchValues = Object.values(matches);

    if (matchValues.includes(5)) {
        return Type.FiveOfAKind;
    } else if (matchValues.includes(4)) {
        return Type.FourOfAKind;
    } else if (matchValues.includes(3) && matchValues.includes(2)) {
        return Type.FullHouse;
    } else if (matchValues.includes(3)) {
        return Type.ThreeOfAKind;
    } else if (matchValues.filter((value) => value === 2).length === 2) {
        return Type.TwoPairs;
    } else if (matchValues.includes(2)) {
        return Type.OnePair;
    } else {
        return Type.HighCard;
    }
}

export const HandComparator = (a: Hand, b: Hand): number => {
    if (a.type > b.type) {
        return 1;
    } else if (a.type < b.type) {
        return -1;
    } else {
        const aCards = a.cards.split('');
        const bCards = b.cards.split('');

        const aCardStrengths = aCards.map((card) => cardStrengths.indexOf(card));
        const bCardStrengths = bCards.map((card) => cardStrengths.indexOf(card));

        let rval = 0;

        for (let i = 0; i < aCardStrengths.length; i++) {
            if (aCardStrengths[i] > bCardStrengths[i]) {
                rval = 1;
                break;
            } else if (aCardStrengths[i] < bCardStrengths[i]) {
                rval = -1;
                break;
            }
        }

        return rval;
    }
};