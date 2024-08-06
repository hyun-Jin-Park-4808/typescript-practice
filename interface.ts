type Poet2 = {
    born: number;
    name: string;
};

interface Poet3 {
    born: number;
    name: string;
} // 보통 인터페이스 선언 뒤에는 세미콜론을 넣지 않는다. 

let valueLater: Poet3;

valueLater = {
    born: 1935,
    name: 'Sara Teasdale',
}

// valueLater = "Emily"; string 타입은 Poet3 에 할당되지 않았다.

// 선택적 속성 
interface BookInterface {
    author?: string;
    pages: number;
}

const okay: Book = {
    author: "Rita",
    pages: 80,
};

const missing: Book = {
    pages: 80
};

// 읽기 전용 속성
interface Page {
    readonly text: string;
}

function read(page: Page) {
    console.log(page.text); // text 속성 수정 없이 읽으므로 OK

    // page.text += "!"; 수정하면 에러 방생 
}

const pageIsh = {
    text: "Hello, world!",
};

pageIsh.text += "!"; // Page 객체가 아니라 text가 있는 유추된 객체 타입

read(pageIsh); // 더 구체적인 버전인 Page를 읽는다. 

// 인터페이스 멤버를 함수로 선언 
interface HasBothFunctionTypes {
    property: () => string;
    method(): string;
}

const hasBothTypes: HasBothFunctionTypes = {
    property: () => "",
    method() {
        return "";
    }
};

hasBothTypes.property();
hasBothTypes.method();

interface OptionalReadonlyFunctions {
    optionalProperty?: () => string;
    optionalMethod?(): string; 
}

type FunctionAlias = (input: string) => number;

interface CallSignature {
    (input: string): number;
}

// 타입: (input: string) => number
const typeFunctionAlias: 
FunctionAlias = (input) => input.length;

// 타입: (input: string) => number
const typedCallSignature: 
CallSignature = (input) => input.length;


interface FunctionWithCount {
    count: number;
    (): void;
}

let hasCallCount: FunctionWithCount;

function keepsTrackOfCalls() {
    keepsTrackOfCalls.count += 1;
    console.log(`I've been called ${keepsTrackOfCalls.count} times!`);
}

keepsTrackOfCalls.count = 0;
hasCallCount = keepsTrackOfCalls;

function doesNotHaveCount() {
    console.log("No idea!");
}

// hasCallCount = doesNotHaveCount; 
// hasCallCount의 타입이 FunctionWithCount로 선언되어 오류 발생
// FunctionWithCount 인터페이스는 함수 시그니처 외에도 count라는 숫자 속성을 포함해야 한다.
// doesNotHaveCount 함수는 단순한 함수로 count 속성을 가지지 않는다. 

// 인덱스 시그니처 
interface WordCounts {
    [i: string]: number;
}

const counts: WordCounts = {};
counts.apple = 0;
counts.banana = 1;
// counts.cherry = false; counts의 string 키 값의 반환 값은 number여야 한다. 

interface DatesByName {
    [i: string]: Date;
}

const publishDates: DatesByName = {
    Frankenstein: new Date("1 January 1818"),
};

publishDates.Frankenstein; // 타입: Date
console.log(publishDates.Frankenstein.toString());

publishDates.Beloved; // 타입은 Date지만, 런타임 값은 undefined;
// console.log(publishDates.Beloved.toString()); 
// 타입 시스템에서는 오류가 나지 않지만, 실제 런타임에서는 오류 발생 

interface HistoricalNovels {
    Oroonoko: number;
    [i: string]: number;
}

const novels: HistoricalNovels = {
    Outlander: 1991,
    Oroonoko: 1688,
};

// const missingOroonoko: HistoricalNovels = {
//     Outlander: 1991,
// } Oroonoko 없어서 에러난다. 

interface ChapterStarts {
    preface: 0; // preface는 반드시 0이어야 한다. 
    [i: string]: number;
}

const correctPreface: ChapterStarts = {
    preface: 0,
    night: 1,
    shopping: 5
};

// const wrongPreface: ChapterStarts = {
    // preface: 1, preface 0 아니어서 에러난다. 
// }

interface MoreNarrowNumbers {
    [i: number]: string;
    [i: string]: string | undefined;
}

const mixesNumbersAndStrings: MoreNarrowNumbers = {
    0: '',
    key1: '',
    key2: undefined,
}

interface MoreNarrowStrings {
    // [i: number]: string | undefined;
    // number 인덱스 유형은 string 인덱스 타입의 서브 타입이어야 한다. 
    // 아래서 string 인텍스 타입의 반환 타입이 string만 있기 때문에 string만 가능!
    [i: string]: string;
}

// 중첩 인터페이스
interface Novel {
    author: {
        name: string;
    };
    setting: Setting; // 중첩 인터페이스
}

interface Setting {
    place: string;
    year: number;
}

let myNovel: Novel;

myNovel = {
    author: {
        name: 'Jane Austen',
    },
    setting: {
        place: 'England',
        year: 1812,
    }
};

// myNovel = {
//     author: {
//         name: 'Emily',
//     },
//     setting: {
//         place: 'Korea'
//     } place 속성 없어서 에러 발생 
// }

// 인터페이스 확장
interface WritingInterface{
    title: string;
}

interface Novella extends WritingInterface {
    pages: number;
}

let myNovella: Novella = {
    pages: 195,
    title: "Ethan Frome",
};

// let missingPages: Novella= {
//     title: "The Awakening",
// } pages 없어서 에러 발생!

// let extraProperties: Novella = {
//     pages: 300,
//     strategy: "baseline",
// } 인터페이스에 없는 strategy 속성 추가해도 에러 발생! 

interface WithNullableName {
    name: string | null;
}

interface WithNonNullableName extends WithNullableName {
    name: string;
}

// interface WithNumericName extends WithNullableName {
//     name: number | string;
// } name은 string이나 null이어야 한다! 

// 다중 인터페이스 확장 
interface GivesNumber {
    giveNumber(): number;
}

interface GivesString {
    giveString(): string;
}

interface GivesBothAndEither extends GivesNumber, GivesString {
    giveEither(): number | string;
}

function useGivesBoth(instance: GivesBothAndEither) {
    instance.giveEither(); // 타입: number | string
    instance.giveNumber(); // 타입: number
    instance.giveString(); // 타입: string 
}

interface Merged {
    fromFirst: string;
}

interface Merged {
    fromSecond: number;
}

// 아래와 같이 된다. 
// interface Merged {
//     fromFirst: string;
//     fromSecond: number;
// }

interface Window { // 기존의 Window 인터페이스에 병합해 사용자 정의 속성 추가 
    myEnvironmentVarible: string;
}

// window는 전역 객체이기 때문에, window를 사용하면 자동으로 Window 객체로 인식! 
window.myEnvironmentVarible; // 타입: string

// 이름이 충돌되는 멤버
interface MergedProperties {
    same: (input: boolean) => string;
    different: (input: string) => string;
}

interface MergedProperties { // 속성은 이름 충돌되면 안된다! 
    same: (input: boolean) => string;
    // different: (input: number) => string; different는 (input: string)으로 이미 선언됨! 
}

// 함수 오버로드
interface MergedMethods { 
    different(input: string): string;
}

interface MergedMethods {
    different(input: number): string; // 함수의 경우는 오버로딩이 된다! 
}



