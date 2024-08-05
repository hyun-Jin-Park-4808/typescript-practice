function sing(song: string) {
    console.log(`Singing: ${song}!`);
}

function singTwo(first: string, second: string) {
    console.log(`${first} / ${second}`);
}

// singTwo("Ball and Chain"); 매개변수가 없어서 에러 발생
singTwo("I Will Survice", "Higher Love");
// singTwo("I Will Survice", "Higher Love", "Dreams"); 매개변수 세 개라 에러 발생 

// 선택적 매개변수
// 모든 선택적 매개변수는 마지막 매개변수여야 한다. 
function announceSong(song: string, singer?: string) {
    console.log(`Song: ${song}`);

    if(singer) {
        console.log(`Singer: ${singer}`);
    }
}

announceSong("Greensleeves");
announceSong("Greensleeves", undefined);
announceSong("Chandelier", "Sia");

function announceSongBy(song: string, singer: string | undefined) {
// something
}

// announceSongBy("Green"); // 매개변수 두 개 입력해야 한다. 
announceSongBy("Greenleeves", undefined);

function rateSong(song: string, rating = 0) {
    console.log(`${song} gets ${rating}/5 stars!`);
}
rateSong("Photograph");
rateSong("Photograph", 5);
rateSong("Photograph", undefined); // 매개변수 타입 종류: number | undefined
// rateSong("Photograph", "100"); 에러 발생 

// 나머지 매개변수
function singAllTheSongs(singer: string, ...songs: string[]) {
    for(const song of songs) {
        console.log(`${song}, by ${singer}`);
    }
}

singAllTheSongs("Alicia Keys");
singAllTheSongs("Alicia Keys", "Bad Romance", "Just Dance");

// 반환 타입
function singSongs(songs:string[]) {
    for(const song of songs) {
        console.log(`${song}`)
    }

    return songs.length;
}

// string | undefined 반환 
// function getSongAt(songs: string[], index: number) {
//     return index < songs.length 
//         ? songs[index] 
//         : undefined;
// }

function singSongsRecursive(songs: string[], count = 0) : number { // 명시적 반환 타입: number
    return songs.length ? singSongsRecursive(songs.slice(1), count + 1) : count;
}

const songSongsRecursive2 = (songs: string[], count = 0): number => 
    songs.length ? songSongsRecursive2(songs.slice(1), count + 1) : count;

// 함수 타입
let nothingInGivesString: () => string; // 매개변수 없고, string 타입 반환 
let inputAndOutput: (songs: string[], count?: number) => number; // 매개변수 2개

// 콜백 매개변수(함수로 호출되는 매개변수)로 설명되는 함수 타입
const songs = ["Juice", "Shake It Off", "What's Up"];

function runOnSongs(getSontAt: (index: number) => string) {
    for(let i = 0; i < songs.length; i += 1) {
        console.log(getSontAt(i));
    }
}

function getSongAt(index: number) {
    return `${songs[index]}`;
}
runOnSongs(getSongAt);

function logSong(song: string) {
    return `${song}`;
}

// runOnSongs(logSong); number 타입의 index가 필요한데 string 타입의 song이 파라미터로 들어가 에러 발생 

// string | undefined 유니언을 반환하는 함수
let returnsStringOrUndefined: () => string | undefined;

// 타입으로 undefined나 string을 반환하는 함수
let maybeReturnString: (() => string) | undefined;

// 매개변수 타입 추론
// singer 변수는 string 타입의 매개변수를 갖는 함수로 알려졌으므로, 나중에 singer가 할당되는 함수 내의 song 매개변수는 string으로 예측된다. 
let singer: (song: string) => string; 

singer = function (song) {
    return `Singing: ${song.toUpperCase()}!`;
};

const songList = ["Call Me", "Jolene", "The Chain"];
songList.forEach((song, index) => { // song: string, index: number로 유추 
    console.log(`${song} is at index ${index}`);
})

// 함수 타입 별칭
type StringToNumber = (input: string) => number; // 타입 정의 
let stringToNumber: StringToNumber; // 변수 선언 
stringToNumber = (input) => input.length; // 함수의 구현, string의 길이의 타입 = number
// stringToNumber = (input) => input.toUpperCase(); input.toUpperCase()가 number 타입이 아니라 에러 발생 

type NumberToString = (input: number) => string; // 타입 정의 
function usesNumberToString(numberToString: NumberToString) { // 함수 정의 
    console.log(`The string is: ${numberToString(1234)}`);
}
usesNumberToString((input) => `${input}! Hooray!`); // The string is 1234! Hooray!
// UserActivation((input => input * 2)); 

// void 반환 타입
function logsSong(song: string | undefined): void {
    if(!song) {
        return;
    }
    console.log(`${song}`);

    // return true; error 발생 
}

let songLogger: (song: string) => void;

songLogger = (song) => {
    console.log(`${song}`);
};

songLogger("Heart of Glass"); // Heart of Glass 출력은 되지만, 반환값 무시 처리

function returnsVoid() {
    return;
}

let lazyValue: string | undefined;

// lazyValue = returnsVoid(); undefined 대신 void 값 할당하려하면 에러 발생 

const records: string[] = [];
function saveRecords(newRecords: string[]) {
    // forEach 메서드는 void를 반환하는 콜백을 받는다. 
    newRecords.forEach(record => records.push(record));
}

saveRecords(['21', 'Come On', 'The Bodyguard']); // 출력이 되지는 않는다. 

// never 반환 타입 
function fail(message: string): never {
    throw new Error(`Invarient falilure: ${message}.`);
}

function workWithUnsafeParam(param: unknown) {
    if(typeof param !== "string") {
        fail(`param should be a string, not ${typeof param}`);
    }

    param.toUpperCase();
}

// 함수 오버로드
function createDate(timestamp: number): Date; // 오버로드 시그니처
function createDate(month: number, day: number, year: number): Date; // 오버로드 시그니처 
// 구현 시그니처 코드 
function createDate(monthOrTimestamp: number, day?: number, year?: number) {
    return day === undefined || year === undefined
    ? new Date(monthOrTimestamp)
    : new Date(year, monthOrTimestamp, day);
}

createDate(554356800);
createDate(7, 27, 1987);
// createDate(4, 1); 인자 두 개에 대한 함수의 오버로드 시그니처가 없기 때문에 에러 발생 

function format(data: string): string;
function format(data: string, needle: string, haystack: string): string;

// function format(getData: () => string): string; 구현 시그니처에서 () => stirng 타입과 호환되는 부분이 없다. 

function format(data: string, needle?: string, haystack?: string) {
    return needle && haystack ? data.replace(needle, haystack) : data; // needle을 haystack으로 교환 
}

