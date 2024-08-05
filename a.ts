// export const shared = "Cher"; // 이렇게 하면 shared는 전역 스코프로 간주됨.

const shared = "Cher";
export {}; // 이렇게 하면 강제로 모듈로 만듦.

// 유니언
let physicist = Math.random() > 0.5
? "Marie Curie" : 84;

physicist.toString(); // string, number 타입에 둘 다 있다.
// physicist.toUpperCase(); // strung에만 있어러 에러남. 

// 값 할당을 통한 내로잉
let admiral: number | string;
admiral = "Grace Hopper";
admiral.toUpperCase(); // string으로 타입 좁혀서 ok
// admiral.toFixed(); // string에 존재 안 하므로 에러

let inventor: number | string = "Hedy Lam"; // 초깃값으로 string 설정해 타입 좁힘

// 조건 검사를 통한 내로잉
let scientist = Math.random() > 0.5
    ? "Rosalind" : 51;

if(scientist === "Rosalind") { // scientist가 string 타입임.
    scientist.toUpperCase(); 
}

// scientist: number | string 타입
// scientist.toUpperCase(); // 에러 발생 

// typeof 검사를 통한 내로잉 
let researcher = Math.random() > 0.5
    ? "Rosalind" : 51;

if(typeof researcher === "string") {
    researcher.toUpperCase();
}

typeof researcher === "string" 
    ? researcher.toUpperCase() // string 
    : researcher.toFixed(); // number 

// literal type
const philosoper = "Hypatia" // 리터널 타입: 특정 원싯값으로 알려진 타입, philosoper의 타입은 Hypatia임. 

// 유니온 타입은 리터럴과 원시 타입을 섞어 쓸 수 있다. 
let lifespan: number | "ongoing" | "uncertain";
lifespan = 89;
lifespan = "ongoing";
lifespan = "uncertain";
// lifespan = true; // 에러 발생 

// 참 검사 
// 자바스크립트에서 false, 0, -0, 0n, "", null, undefined, NaN를 제외하고는 전부 true이다. 
let geneticist = Math.random() > 0.5
    ? "Barbara" 
    : undefined;

if(geneticist) { // string
    geneticist.toUpperCase();
}
// geneticist.toUpperCase(); // undefiend일 수도 있어서 에러 발생 

// `&&` 연산자를 사용한 예제
geneticist && geneticist.toUpperCase(); // geneticist가 문자열이면 toUpperCase 실행, undefined면 undefined
// 선택적 체이닝 연산자를 사용한 예제
geneticist?.toUpperCase(); // geneticist가 문자열이면 toUpperCase 실행, geneticist가 null이거나 undefined면 undefined

// 초깃값이 없는 변수
let mathematician: string;
// mathematician?.length; // 변수에 값 할당되기 전에 사용됐다고 에러 발생 
mathematician = "Mark";
mathematician.length; // 정상 동작

let mathematician2: string | undefined;
mathematician?.length; // 정상 동작

// 타입 별칭 => 자바스크립트로 컴파일 안된다. ts에서만 존재 
type RawData = boolean | number | string | null | undefined; // 여러 타입을 가지는 타입 별칭 만들 수 있음. 
let rawDataFirst: RawData; // 이런 식으로 타입 별칭 사용해서 타입 지정 가능 

type Id = number | string;
type IdMaybe = Id | undefined | null; // 타입 별칭은 서로 참조 가능!, 위아래 순서 바뀌어도 됨. 