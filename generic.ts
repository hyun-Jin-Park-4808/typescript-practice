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

// 유추된 제네릭 인터페이스 타입
interface LinkedNode<Value> {
    next?: LinkedNode<Value>;
    value: Value;
}

function getLast<Value>(node: LinkedNode<Value>): Value {
    return node.next ? getLast(node.next) : node.value;
}

// 유추된 Value 타입 인수: Date
let lastDate = getLast({
    value: new Date("09-13-1993"),
});

// 유추된 Value 타입 인수: string
let lastFruit = getLast({
    next: {
        value: "banana",
    },
    value: "apple",
});

// 유추된 Value 타입 인수: number
// let lastMismatch = getLast({
//     next: {
//         value: 123
//     },
//     value: false, number 타입이어야 한다. 
// })

class Secret<Key, Value> {
    key: Key;
    value: Value;

    constructor(key: Key, value: Value) {
        this.key = key;
        this.value = value;
    }

    getValue(key: Key): Value | undefined {
        return this.key === key
            ? this.value
            : undefined;
    }
}

const storage = new Secret(12345, "lugguge"); // 타입: Secret<number, string>
storage.getValue(1987); // 타입: string | undefined

class CurriedCallback<Input> {
    #callback: (input: Input) => void;

    // 생성자로부터 타입 유추 불가 
    constructor(callback: (input: Input) => void) {
        this.#callback = (input: Input) => {
            console.log("Input:", input);
            callback(input);
        };
    }

    call(input: Input) {
        this.#callback(input);
    }
}

// 타입: CurriedCallback<stirng>
new CurriedCallback((input: string) => {
    console.log(input.length);
});

// 타입: CurriedCallback<unknown>
// new CurriedCallback((input) => {
//     console.log(input.length); length는 unknown의 함수가 아니다! 
// })

// 타입: CurriedCallback<string>
new CurriedCallback<string>((input) => {
    console.log(input.length);
});

// new CurriedCallback<string>((input: boolean) => {
// string 타입으로 명시적 선언해줬기 때문에 boolean 타입 넣을 수 없다. 
// })

// 제네릭 클래스 확장 
class Quote1<T> {
    lines: T;

    constructor(lines: T) {
        this.lines = lines;
    }
}

class SpokeQuote extends Quote1<string[]> {
    speak() {
        console.log(this.lines.join("\n"));
    }
}

new Quote1("The only real failure is the failure to try.").lines; // 타입: string
new Quote1([4, 8, 15]).lines; // 타입: number[]

new SpokeQuote([
    "Greed is so destructive.",
    "It destroys everything",
]).lines; // 타입: string[]

// new SpokeQuote([4, 8, 15]); SpokeQuote는 string[] 타입이어야 한다! 

class AttributedQuote<Value> extends Quote1<Value> {
    speaker: string

    constructor(value: Value, speaker: string) {
        super(value);
        this.speaker = speaker;
    }
}

// 타입: AttributedQuote<string>
// (Quote<string> 확장하기)
new AttributedQuote( // 생성자에 value, speaker 두 매개변수가 있음! 
    "The road to success is always under construction.",
    "Lily Tom",
);

// 제네릭 인터페이스 구현
interface ActingCredit<Role> {
    role: Role;
}

class MoviePart implements ActingCredit<string> {
    role: string;
    speaking: boolean;

    constructor(role: string, speaking: boolean) {
        this.role = role;
        this.speaking = speaking;
    }
}

const part = new MoviePart("Miranda Priestly", true);
part.role; // 타입: string
 
// class IncorrectExtension implements ActingCredit<string> {
//     role: boolean; // role은 string이어야 한다. 
// }

class CreatePairFactory<Key> {
    key: Key;

    constructor(key: Key) {
        this.key = key;
    }

    createPair<Value>(value: Value) {
        return { key: this.key, value };
    }
}

// 타입: CreatePairFactory<string>
const factory = new CreatePairFactory("role");

// 타입: { key: string, value: number }
const numberPair = factory.createPair(10);

// 타입: { key: string, value: string }
const stringPair = factory.createPair("Sophie");

class BothLogger<OnInstance> {
    instanceLog(value: OnInstance) { // 인스턴스 멤버 
        console.log(value);
        return value;
    }

    static staticLog<OnStatic>(value: OnStatic) { // 클래스의 정적 멤버
        // let fromInstance: OnInstance; 정적 멤버는 인스턴스 타입 매개변수를 참조할 수 없다.
        console.log(value);
        return value;
    }
}

const logger = new BothLogger<number[]>;
logger.instanceLog([1, 2, 3]); // 타입: number[]

// 유추된 OnStatic 타입 인수: boolean[]
BothLogger.staticLog([false, true]);

// 유추된 OnStatic 타입 인수: string
BothLogger.staticLog<string>("You can't change the music");

// 제네릭 별칭 타입 
type CreatesValue<Input, Output> = (input: Input) => Output;

// 타입: (input: string) => number
let creator: CreatesValue<string, number>;

creator = text => text.length; // output: number
// creator = text => text.toUpperCase(); output이 number여야 한다.

type Result<Data> = FailureResult | SuccessfulResult<Data>;
interface FailureResult {
    error: Error;
    succeeded: false;
}

interface SuccessfulResult<Data> {
    data: Data;
    succeeded: true;
}

function handleResult(result: Result<string>) {
    if(result.succeeded) {
        // result: SuccessfulResult<string>의 타입
        console.log(`We did it! ${result.data}`);
    } else {
        // result: FailureResult의 타입
        console.error(`Awww... ${result.error}`);
    }

    // result.data; result의 타입이 성공인지 실패인지 알 수 없다.
    // FailureResult의 경우 data가 존재하지 않아 에러 발생! 
}

// 제네릭 기본 값
interface QuoteInterface<T = string> { 
    // 값 제공 안되면 기본값이 string인 타입 매개변수를 받는다. 
    value: T;
}

let explicit: QuoteInterface<number> = {value: 123 };
let implicit: QuoteInterface = { value: "Be yourself." }
// let mismatch: QuoteInterface = { value: 123 }; // 값 제공 안하면 T는 string이다. 

interface KeyValuePair<Key, Value = Key> { 
    // Key, Value는 다른 타입 가질 수 있지만, 기본적으로 동일한 타입을 유지한다.
    key: Key;
    value: Value;
}

// 타입: KeyValuePair<string, string>
let allExplicit: KeyValuePair<string, number> = {
    key: "rating",
    value: 10,
}

// 타입: KeyValuePair<string>
let oneDefaulting: KeyValuePair<string> = {
    key: "rating",
    value: "ten",
};

// let firstMissing: KeyValuePair = { 매개변수 타입을 하나 혹은 두 개 지정해줘야 한다. 
//     key: "rating",
//     value: 10,
// };

// First, Second 앞에 기본값 있는 제네릭 타입 없으므로 오류 없음! 
function inTheEnd<First, Second, Third = number, Fourth = string>() {}

// 기본값이 없는 제네릭 타입이 기본값이 있는 타입 다음에 있으면 안 된다! 
// function inTheMiddle<First, Second = boolean, Third = number, Fourth>() {}

interface WithLength {
    length: number;
}

function logWithLength<T extends WithLength>(input: T) {
    console.log(`Length: ${input.length}`);
    return input;
}

logWithLength("No one can figure out your worth bu you."); // 타입: string
logWithLength([false, true]); // 타입: boolean[]
logWithLength({ length: 123 }); // 타입: { length: number }

// logWithLength(new Date()); Date 타입에는 숫자형 length 멤버가 없어 타입 오류 발생 

// keyof와 제한된 타입 매개변수
function get<T, Key extends keyof T>(container: T, key: Key) {
    return container[key];
}

const roles = {
    favorite: "Fargo",
    others: ["Almost Famous", "Nomadland"],
};

const favorite = get(roles, "favorite"); // 타입: string
const others = get(roles, "others") // 타입: string[]
// const missings = get(roles, "extras");

function gets<T>(container: T, key: keyof T) { // T 타입에 속한 키의 타입 전부 가능 
    return container[key];
}

const roles2 = {
    favorite: "Fargo",
    others: ["Almost Famous", "Nomaland"],
};

const found = gets(roles, "favorite"); // 타입: string | string[]

