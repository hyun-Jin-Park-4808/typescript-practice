let arrayOfNumbers: number[];
arrayOfNumbers = [4, 8, 15, 16];

// 타입은 string 배열을 반환하는 함수
let createStrings: () => string[];

createStrings = () => {
    return ["hello", "world"];
};

let strings = createStrings(); // strings의 타입: string[], ["hello", "world"]를 반환 

// 타입은 각각의 string을 반환하는 함수 배열 
let stringCreators: (() => string)[];
stringCreators = [
    () => "hello",
    () => "world"
];

let firstString = stringCreators[0](); // hello 반환 
let secondString = stringCreators[1](); // world 반환 

// 타입은 string 또는 number의 배열
let stringOrArrayOfNumbers: string | number[];

// 타입은 각각 number 또는 string인 요소의 배열 
let arrayOfStringOrNumbers: (string | number)[];

// 이렇게 string 타입만 선언되있는 경우, string은 추가 못한다.
const names = [
    "Aqualtune",
    "Blenda",
];

// 타입: (string | undefined)[]
const namesMaybe = [
    "Aqualtune",
    "Blenda",
    undefined,
];

// any 배열
let values = []; // any[]

values.push(''); // string[]
values[0] = 0; // (number | string)[]

// 다차원 배열
let arrayOfArraysOfNumbers: number[][];

arrayOfArraysOfNumbers = [
    [1, 2, 3],
    [2, 4, 6],
    [3, 6, 9],
];

// 타입: number[][]
let arrayOfArraysOfNumbers2: (number[])[];

const defenders = ["Clarenza", "Dina"];

// 타입: string
const defender = defenders[0];

const soldiersOrDates = ["Deborah Sampson", new Date(1782, 6, 3)];

// 타입: string | Date
const soldierOrDate = soldiersOrDates[0];

// 불안정한 멤버
function withElements(elements: string[]) {
    // console.log(elements[9001].length); 
    // 타입 오류 발생, undefined로 읽힘.  
}

withElements(["It's", "over"]);

// 스프레드
const soldiers = ["Harriet Tubman", "Joan of Arc", "Khutulun"]; // string[]
const soldierAges = [90, 19, 45]; // number[]
const conjoined = [...soldiers, ...soldierAges]; // (string | number)[]

function logWarriors(greeting: string, ...names: string[]) {
    for(const name of names) {
        console.log(`${greeting}, ${name}`);
    }
}

const warriors = ["Cathay Williams", "Lozen", "Nzinga"];
logWarriors("Hello", ...warriors); // 나머지 매개변수로 string[]만 받는다. 
const birthYears = [1884, 1840, 1583];
// logWarriors("Born in", ...birthYears); number[]는 허용되지 않는다. 

// 튜플
let yearAndWarrior: [number, string];
yearAndWarrior = [530, "Tomyris"];
// yearAndWarrior = [false, "Tomyris"]; false는 number 타입이 아님.
// yearAndWarrior = [530]; 배열 요소는 두 개가 있어야 한다. 

// 배열 구조 분해 할당 
let [year, warrior] = Math.random() > 0.5
    ? [340, "Archidamia"] // year 타입: number, string 타입: number
    : [1828, "Rani of Jhansi"];

// 튜플 할당 가능성
const pairLoose = [false, 123]; // (boolean | number)[] 타입의 가변 길이 배열 
// const pairTupleLoose: [boolean, number] = pairLoose; // 튜플 타입으로 가변 길이 배열 할당 못함. 

// 나머지 매개변수로서의 튜플
function logPair(name: string, value: number) {
    console.log(`${name} has ${value}`);
}

const pairArray = ["Amage", 1]; // (string | number)[]로 인식
// logPair(...pairArray); logPair의 매개변수는 튜플형식이어야 한다! 

const pairTupleCorrect: [string, number] = ["Amage", 1];
logPair(...pairTupleCorrect); // 튜플 형식의 스프레드를 넣으면 OK

// 나머지 매개변수 튜플 사용 
function logTrio(name: string, value: [number, boolean]) {
    console.log(`${name} has ${value[0]} (${value[1]}`);
}

const trios: [string, [number, boolean]][] = [
    ["Amanitore", [1, true]],
    ["There", [2, false]],
    ["Ann", [3, false]]
];

trios.forEach(trio => logTrio(...trio)); // ...trio가 logiTrio의 매개변수 타입과 일치
// trios.forEach(logTrio); 
// 첫 번째 매개변수 string에 [string, [number, boolean]] 타입이 매칭되려 해서 에러

// 튜플 추론
function firstCharAndSize(input: string) {
    return [input[0], input.length]; // 반환 타입: (string | number)[]
}

const [firstChar, size] = firstCharAndSize("Gudit");
// firstChar 타입, size 타입: string | number 

// 명시적 튜플 타입
function firstCharAndSizeExplicit(input: string): [string, number] {
    return [input[0], input.length];
}

const [firstChar2, size2] = firstCharAndSizeExplicit("Cathy Williams");

// const 어서션 
const unionArray = [157, "Tomoe"]; // 타입: (string | number)[]

const readonlyTuple = [157, "Tomoe"] as const; // 타입: readonly [157, "Tomoe"]
// 배열이 튜플로 처리되어야 함을 나타냄 

const pairMutable: [number, string] = [157, "Tomoe"]; // 명시적 튜플 타입
pairMutable[0] = 1247; // 수정 가능 

const pairCosnt = [157, "Tomoe"] as const;
// pairCosnt[0] = 1247; // readonly에는 값 할당할 수 없다. 

// 반환 타입: readonly [string, number]
// 튜플을 반환하는 함수로부터 반환된 값은 보통 즉시 구조화되지 않는다. 
// 즉, 일기 전용 튜플은 함수를 사용하는 데 방해가 되지 않는다. 
// 읽기 전용을 반환하지만, 이를 사용하는 코드는 해당 튜플에서 값을 찾는 것에만 관심을 둔다.
function firstCharAndSizeAsConst(input: string) {
    return [input[0], input.length] as const;
}

// firstChar 타입: string
// size 타입: number
const [firstChar3, size3] = firstCharAndSizeAsConst("Ching Shih"); 