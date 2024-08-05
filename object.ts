// 객체 타입 직접 유추 
const poet = {
    born: 1935,
    name: "Mary",
};

poet['born'];
poet.name;

// 객체 타입 선언 
let poetLater: {
    born: number;
    name: string;
};

poetLater = {
    born: 1935,
    name: "Mary",
};

// 별칭 객체 타입 => 일반적임, 클래스 느낌! 
type Poet = {
    born: number;
    name: string;
};

const extraProperty: Poet = {
    // activity: "walking", // 초과 속성 오류 발생 
    born: 1935,
    name:"Mary", 
}

const existingObject = { // 기존 객체 리터럴제공하면 초과 속성 검사 우회함.  
    activity: "walking",
    born: 1935,
    name: "Mary",
};

const extraPropertyButOk: Poet = existingObject; // 이 경우는 에러 안 남. 

let poet2: Poet;

poet2 = {
    born: 1935,
    name: "Sara",
};

// 구조적 타이핑
type WithFirstName = {
    firstName: string;
}

type WithLastName = {
    lastName: string;
}

const hasBoth = { 
    firstName: "Lucy",
    lastName: "Clifton",
};

// 명시적으로 변수 타입 선언 안했지만, WithFirstName, WithLastName에 선언된 변수 모두 가지므로 두 변수 모두 제공 가능 
let withFirstName: WithFirstName = hasBoth;
let withLastName: WithLastName = hasBoth;

// 사용 검사
type FirstAndLastNames = {
    first: string;
    last: string;
};

const hasBothName: FirstAndLastNames = {
    first: "Sano",
    last: "Naidu",
};

// const hasOnlyOne: FirstAndLastNames = {
//     first: "Sano" // last 없어서 에러 발생! 
// };

type Poem = {
    author: {
        firstName: string;
        lastNamme: string;
    };
    name: string;
};

const poemMatch: Poem = {
    author:{
        firstName: "Sylvia",
        lastNamme: "Plath",
    },
    name: "Lady Lazarus",
};

type Book = {
    author?: string;
    pages: number;
};

const ok: Book = {
    pages: 80,
};

type Writers = {
    author: string | undefined;
    editor?: string;
};

const hasRequired: Writers = {
    author: undefined,
};

const poem = Math.random() > 0.5 
    ? { namae: "Name", pages: 7 }
    : {name: "Name2", rhymes: true};

// 가능한 타입
/*
{
    name: string;
    pages: number;
    rhymes?: undefined;
}
    or
{
    name: string;
    pages?: undefined;
    rhymes: boolean;
}
*/


