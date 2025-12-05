import {Md5} from 'ts-md5';

export const findPassword = (input: string) => {
    let password = ['.' , '.' , '.' , '.' , '.' , '.' , '.' , '.'];
    let index = 0;

    while (password.indexOf('.') > -1) {
        const test = `${input}${index}`;

        const hash = new Md5().appendStr(test).end(false) as string;

        if (hash.substring(0, 5) === '00000') {
            let position = hash.substring(5, 6);
            let positionAsNumber = Number(position);
            let value = hash.substring(6, 7);

            if (!Number.isNaN(positionAsNumber) && positionAsNumber < 8 && password[positionAsNumber] === '.') {                
                password[positionAsNumber] = value;
            }
        }

        index++;
    }

    return password.join('');
}