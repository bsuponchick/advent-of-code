import {Md5} from 'ts-md5';

export const findPassword = (input: string) => {
    let password = '';
    let index = 0;

    while (password.length < 8) {
        const test = `${input}${index}`;

        const hash = new Md5().appendStr(test).end(false) as string;

        if (hash.substring(0, 5) === '00000') {
            password += hash.substring(5, 6);
        }

        index++;
    }

    return password;
}