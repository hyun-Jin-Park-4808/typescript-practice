let anyValue: any;
anyValue = "Lucy";
anyValue = 123;
console.log(anyValue); // 123

// Function greetComedian(name: unknown) {
//     console.log(`Announcing ${name.toUpperCase()}!`);
// } 
/*  타입스크립트가 unknown 타입인 name에 접근할 수 있는 유일한 방법은
    instanceof나 typeof 또는 타입 어서션을 사용하는 것처럼 값의 타입이 제한된 경우이다.
*/

function greetComedianSafety(name: unknown) {
    if(typeof name === "string") {
        console.log(`Announcing ${name.toUpperCase()}!`);
    } else {
        console.log("Well, I'm off.");
    }
}

greetComedianSafety("Betty White"); // Announcing BETTY WHITE!
greetComedianSafety({}); // Well, I'm off.

// 타입 서술어 
function isNumberOrString(value: unknown): value is number | string {
    return ['number', 'string'].includes(typeof value);
}

function logValueIfExists(value: number | string | null | undefined) {
    if(isNumberOrString(value)) {
        // value: number | string type
        value.toString();
    } else {
        // value: null | undefined type
        console.log("value does not exist:", value);
    }
}

interface Comedian {
    funny: boolean;
}

interface StandupComedian extends Comedian {
    routine: string;
}

function isStandupComedian(value: Comedian): value is StandupComedian {
    return 'routine' in value; // value 객체에 routine이 존재하는지 확인 
}

function workWithComedian(value: Comedian) {
    if(isStandupComedian(value)) {
        // value: StandupComedian 타입
        console.log(value.routine);
    }

    // vlaue: Comedian 타입
    // console.log(value.routine); Comedian에는 routine 속성이 없다. 
}

const standupComedian: StandupComedian = {
    funny: true, // 부모 인터페이스 속성도 가지고 있어야 에러 안 난다! 
    routine: "Why did the chicken cross the road?"
};

workWithComedian(standupComedian);

function isLongString(input: string | undefined): input is string {
    return !!(input && input.length >= 7); // input이 undefined 또는 길이가 7보다 작으면 false 반환 
}

function workWithText(text: string | undefined) {
    if(isLongString(text)) {
        // text: string type
        console.log("Long text: ", text.length);
    } else {
        /* text 타입을 undefined로 좁힌다. 
          console.log("Short text: ", text?.length); 
          text?.length를 사용하면 타입스크립트가 타입 추론을 잘 못해서 never 타입으로 인식하고 
          never 타입에는 length는 존재하지 않는다는 오류를 낸다. 
        */
    }
}

// 타입 연산자
// keyof
interface Ratings {
    audience: number;
    critics: number;
}

function getRating(ratings: Ratings, key: 'audience' | 'critics'): number {
    return ratings[key]; // key에 해당하는 Ratings 배열의 값 반환 
}

const ratings: Ratings = { audience: 66, critics: 84 };
getRating(ratings, 'audience');

// keyof를 쓰면 유니언 타입을 전부 나열할 필요가 없다! 
function getCountKeyof(ratings: Ratings, key: keyof Ratings): number {
    return ratings[key];
}

const ratings2: Ratings = { audience: 66, critics: 84 };
const num = getCountKeyof(ratings2, 'audience');
console.log(num); // 66

// typeof
const original = {
    medium: "movie",
    title: "Mean Girls",
};

let adaptation: typeof original;

if(Math.random() > 0.5) {
    adaptation = { ...original, medium: "play" };
    // ...original: original 객체의 모든 속성을 새 객체에 복사한다. 
    // { medium: "play", title: "Mean Girls" }
} else {
    // adaptation = { ...original, medium: 2 }; string 속성에 number 타입 대입해서 오류
}

// keyof typeof
const ratings3 = {
    imdb: 8.4,
    metacritic: 82,
};

// 인터페이스 생성하는 대신 keyof typeof를 사용해 키가 ratings3 값 타입의 키 중 하나여야 함을 나타낸다. 
function logRating(key: keyof typeof ratings3) { 
    console.log(ratings3[key]); // key: "imdb" | "metacritic"
}

// 타입 어서션
const rawData = '["grace", "frank"]';

// 타입: any
JSON.parse(rawData);

// 타입: string[]
JSON.parse(rawData) as string[];

//타입: [string, string]
JSON.parse(rawData) as [string, string];

// 타입: ["grace", "frank"]
JSON.parse(rawData) as ["grace", "frank"];

// 오류 타입 어서션
try {
    // 오류를 발생시키는 코드 
} catch (error) {
    console.warn("Error!", (error as Error).message)
}

// 타입 내로잉 사용해서 더 안잔하게 검사하기 
try {
    // 오류를 발생시키는 코드 
} catch (error) {
    console.warn("Error!", error instanceof Error ? error.message : error);
}

// 타입 유추: Date | undefined
let maybeDate = Math.random() > 0.5
    ? undefined
    : new Date();

// 타입이 Date로 간주됨.
// 개발자가 해당 변수가 특정 타입임을 보장한다고 알리는 방법
// 개발자가 타입 체크를 우회하고 강제로 지정하는 방식으로, 실제 Date 타입이 아닐 수도 있다. 
// 런타임 오류가 발생할 수 있다. 
maybeDate as Date;

// 타입이 Date라고 간주됨. 
// maybeDate가 null | undefined가 아님을 보장하는 것이다! 
maybeDate!;

const seasonCounts = new Map([
    ["I love you", "low"],
    ["The Golden Girls", "high"],
]);

// type: string | undefined
const maybeValue = seasonCounts.get("I love you");

// console.log(maybeValue.toUpperCase()); undefined일 수 있음. 

// type: string
const knowValue = seasonCounts.get("I love you")!;

console.log(knowValue.toUpperCase()); // OK

const runtimeErrorValue = seasonCounts.get("No value")!;
console.log(runtimeErrorValue.toUpperCase()); // 타입 오류는 아니지만, 런타임 오류가 발생

interface Entertainer {
    acts: string[];
    name: string;
}

// const declared: Entertainer = {
//     name: "Moms",   
// } acts 속성 없어서 오류 발생

const asserted = {
    name: "Moms",
} as Entertainer; // 허용되지만 런타임 시 오류 발생 

console.log(asserted.acts.join(", ")); // 런타임 시 오류 발생 

// 타입: (number | string)[]
[0, ''];

// 타입: readonly [0, '']
[0, ''] as const;

// 타입: () => string
const getName = () => "Maria Bamford";

// 타입: () => "Maria Bamford",특정 리터럴로 이해 
const getNameConst = () => "Maria Bamford" as const;

interface Joke {
    quote: string;
    style: "story" | "one-liner";
}

function tellJoke(joke: Joke) {
    if(joke.style === "one-liner") {
        console.log(joke.quote);
    } else {
        console.log(joke.quote.split("\n"));
    }
}

// 타입: {quote: string; style: "one-liner"}
const narrowJoke = {
    quote: "If you stay alive for no other reason do it for spite.",
    style: "one-liner" as const,
};

tellJoke(narrowJoke);

// 타입: {quote: string; style: string}
const wideObject = {
    quote: "Time files when you are anxious!",
    style: "one-liner", // string 타입으로 지정된다! 
};

// tellJoke(wideObject); 
/*
'{ quote: string; style: string; }' 형식의 인수는 'Joke' 형식의 매개 변수에 할당될 수 없습니다.
  'style' 속성의 형식이 호환되지 않습니다.
  'string' 형식은 '"story" | "one-liner"' 형식에 할당할 수 없습니다.
*/

// 읽기 전용 객체
function describePreference(preference: "maybe" | "no" | "yes") {
    switch(preference) {
        case "maybe":
            return "I suppose...";
        case "no":
            return "No thanks";
        case "yes":
            return "Yes please!";
    }
}

// 타입: { movie: string, standup: string }
const preferencesMutable = {
    movie: "maybe", // string 타입
    standup: "yes",
};

// describePreference(preferencesMutable.movie); string 타입은 리터럴 타입과 다름!

preferencesMutable.movie = "no"; // string이라 변경 가능!

// 타입: readonly { readonly movie: "maybe", readonly standup: "yes" }
const preferencesReadonly = {
    movie: "maybe",
    standup: "yes",
} as const; // 리터럴로 타입 지정! 

describePreference(preferencesReadonly.movie);

// preferencesReadonly.movie = "no"; readonly라 변경 불가 

