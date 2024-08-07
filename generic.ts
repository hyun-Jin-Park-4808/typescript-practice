// 제네릭 함수 
function identity<T>(input: T) {
    return input;
}

const numeric = identity("me"); // 타입; "me"
const stringy = identity(123); // 타입: 123

// 화살표 함수로 제네릭 만들기
const identityArrow = <T>(input: T) => input;
identityArrow(123); // 타입: 123

// 명시적 제네릭 호출 타입 
function logWrapper<Input>(callback: (input: Input) => void) {
    return (input: Input) => {
        console.log("Input:", input);
        callback(input);
    }
}

// 타입: (input: string) => void
logWrapper((input: string) => {
    console.log(input.length);
});

// 타입: (input: unknown) => void
// logWrapper((input) => {
//     console.log(input.length);
// }); input이 unknown으로 인식되어서 에러 발생 

// 타입: (input: string) => void
logWrapper<string>((input) => {
    console.log(input.length);
});

// logWrapper<string>((input: boolean) => {
// }); input에는 string 타입만 가능하다! 

function makeTuple<First, Second>(first: First, second: Second) {
    return [first, second] as const;
}

let tuple = makeTuple(true, "abc"); // value: readonly [boolean, string] 타입 

function makePair<Key, Value>(key: Key, value: Value) {
    return { key, value };
}

// OK: 타입 인수가 둘 다 제공되지 않음
makePair("abc", 123); // 타입: { key: string, value: number }

// OK: 두 개의 타입 인수가 제공됨
makePair<string, number>("abc", 123); // 타입: { key: string, value: number }
makePair<"abc", 123>("abc", 123); // 타입: { key: "abc", value: 123 }

interface Box<T> {
    inside: T;
}

let stringyBox: Box<string> = {
    inside: "abc",
}

let numberBox: Box<number>= {
    inside: 123,
}

// let incorrectBox: Box<number> = {
//     inside: false, Box의 매개변수 타입은 number이다. 
// }

interface Array<T> {
    /**
     * 배열에서 마지막 요소 제거하고 그 요소를 반환
     * 배열이 비어 있는 경우 undefined를 반환하고 배열은 수정되지 않는다.
     */
    pop(): T | undefined;

    /**
     * 배열의 끝에 새로운 요소를 추가하고 배열의 길이를 반환
     * @param items 배열에 추가된 새로운 요소
     * ...items: items는 파라미터의 이름, T[]는 items의 타입
     */
    push(...items: T[]): number;
}

