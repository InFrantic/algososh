import { ElementStates } from "../../types/element-states";

export type TArraySort = {
    state: number;
    color: ElementStates;
};

const randomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomArr = (): TArraySort[] => {
    let arr: TArraySort[] = [];
    const minLen = 3;
    const maxLen = 17;
    let length = randomNumber(minLen, maxLen);

    for (let i = 0; i < length; i++) {
        arr.push({ state: randomNumber(0, 100), color: ElementStates.Default });
    }
    return arr;
};

export type TArray = {
    value?: string | undefined;
    color: ElementStates;
};