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
    console.log(elements[9001].length); 
    // 타입 오류 없음. undefined가 아닌 string으로 간주된다. 
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