class PromiseLikes<Value> {
    constructor(
        executor: (
            resolve: (value: Value) => void,
            reject: (reason: unknown) => void,
        ) => void,
    ) {}
}

// 타입: Promise<unknown>
const resolveUnknown = new Promise((resolve) => {
    setTimeout(() => resolve("Done!"), 1000);
});

// 타입: Promise<string>
const resolvesString = new Promise<string>((resolve) => {
    setTimeout(() => resolve("Done!"), 1000);
});

// 타입: Promise<string>
const textEventually = new Promise<string>((resolve) => {
    setTimeout(() => resolve("Done!"), 1000);
}); // 1초 뒤 string 값을 resolve한다. 

// 타입: Promise<number>
const lengthEventually = textEventually.then((text) => text.length)
// number를 resolve하기 위해 1초를 더 기다린다. 

// 타입: (text: string) => Promise<number>
async function lengthAfterSecond(text: string) {
    // await: 해당 Promise가 완료될 때까지 함수의 실행을 일시 중지
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return text.length;
}

// 타입: (text: string) => Promise<number>
async function lengthImmediately(text: string) {
    return text.length; // 지연없이 바로 반환 
}

async function givesPromiseForString(): Promise<string> {
    return "Done!";
}

// async function givesString(): string {
//     return "Done!"; // 명시적으로 선언하려면 무조건 Promise<T> 타입으로 선언해야 한다. 
// }

