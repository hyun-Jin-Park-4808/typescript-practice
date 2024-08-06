class Greeter {
    greet(name: string) {
        console.log(`${name}, do your stuff!`);
    }
}

new Greeter().greet("Miss Frizzle");

// new Greeter().greet(); 매개변수 없으면 에러 발생

class Greeted {
    constructor(message: string) {
        console.log(`As I always say: ${message}!`);
    }
}

new Greeted("take chances, make mistakes, get messy");

// new Greeted(); 기본 생성자 없어서 에러 발생 

// 클래스 속성
class FieldTrip {
    destination: string;

    constructor(destination: string) {
        this.destination = destination;
        console.log(`We're going to ${this.destination}!`);

        // this.nonexistent = destination;// 존재하지 않는 속성이라 에러 발생
    }
}

const trip = new FieldTrip("plantarium");
trip.destination;

class WithMethod {
    myMethod() {}
}

new WithMethod().myMethod === new WithMethod().myMethod; // true

class WithProperty { // 클래스의 모든 속성은 초기화되어야 한다. 
    myProperty: () => void = () => {};

    /* 방법2. 생성자 사용
    myProperty: () => void;
    constructor() {
        this.myProperty = () => {};
    }
    */
}

new WithProperty().myProperty === new WithProperty().myProperty; // false 

// 초기화 검사 
class WithValue {
    immediate = 0;
    later: number; // 속성 초깃값 생성자에서 할당 
    mayBeUndefined: number | undefined; // undefined 되는 것 허용 
    // unused: number; 초깃값 없으면 에러 발생 

    constructor() {
        this.later = 1;
    }
}

// class MissingInitializer {
//     property: string; // 초기값 할당해야 함. 
// }

// new MissingInitializer().property.length;

class ActivitiesQueue {
    pending!: string[];

    initialize(pending: string[]) {
        this.pending = pending;
    }

    next() {
        return this.pending.pop();
    }
}

const activities = new ActivitiesQueue();

activities.initialize(['eat', 'sleep', 'learn'])
activities.next();

// 선택적 속성
class MissingInitializer {
    property?: string; // ?사용하면 클래스 생성자에서 할당하지 않아도 된다. 
}

new MissingInitializer().property?.length;
// new MissingInitializer().property.length; undefined일 수 있어서 ? 붙여줘야 한다. 

// 읽기 전용 속성 
class Quote {
    readonly text: string;

    constructor(text: string) {
        this.text = text;
    }

    // emphasize() {
    //     this.text += "!"; readonly 속성은 수정 불가! 
    // }
}

const quote = new Quote("Good");
// quote.text = "Ha"; readonly 수정 불가! 

class RandomQuote {
    readonly explicit: string = "Home is the nicest word there is.";
    // type: string으로 좁혀진 것! 
    readonly implicit = "Home is the nicest word there is.";
    // type: "Home is the nicest word there is."으로 좁혀진 것! 

    constructor() {
        if(Math.random() > 0.5) {
            this.explicit = "We start learning the minute we're born."; // string 타입으로 변경 가능 
            // this.implicit = "We start learning the minute we're born.";
            // "Home is the nicest word there is." 타입이어야 한다! 
        }
    }
}

const randomQuote = new RandomQuote();
randomQuote.explicit; // 타입: string
randomQuote.implicit; // 타입: "Home is the nicest word there is."

class Teacher {
    sayHello() {
        console.log("take chances, make mistakes, get messy!");
    }
}

let teacher: Teacher;
teacher = new Teacher();
// teacher = "Wahoo!"; Teacher 클래스에는 string 타입이 없다. 

class SchoolBus {
    getAblilities() {
        return ["magic", "shapeshifiting"];
    }
}

function withSchoolBus(bus: SchoolBus) {
    console.log(bus.getAblilities());
}

withSchoolBus(new SchoolBus());

withSchoolBus({
    getAblilities: () => ["transmogrification"],
});

// withSchoolBus({
//     getAblilities: () => 123, 
// number 타입은 string[] 타입에 할당되지 않는다! 
// })

interface Learner {
    name: string;
    study(hours: number): void;
}

class Student implements Learner {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    study(hours: number) {
        for(let i = 0; i < hours; i += 1) {
            console.log("...studying...");
        }
    }
}

interface Graded {
    grades: number[];
}

interface Reporter {
    report: () => string;
}

class ReportCard implements Graded, Reporter {
    grades: number[];

    constructor(grades: number[]) {
        this.grades = grades;
    }

    report() {
        return this.grades.join(", ");
    }
}

interface AgeIsANumber {
    age: number;
}

interface AgeIsNotANumber {
    age: () => string;
}

// 위와 같이 두 개의 충돌하는 인터페이스 구현하는 클래스는 구현할 수 없다. 
// class AsNumber implements AgeIsANumber, AgeIsNotANumber {
//     age = 0;
// }

class Teacher2 {
    teach() {
        console.log("The surest test of discipline is its absence.");
    }
}

class StudentTeacher extends Teacher2 {
    learn() {
        console.log("I cannot afford the luxury of a closed mind.");
    }
}

const teacher2 = new StudentTeacher();
teacher2.teach(); // 기본 클래스에 정의됨.
teacher2.learn(); // 하위 클래스에 정의됨. 

// 할당 가능성 확장
class Lesson {
    subject: string;

    constructor(subject: string) {
        this.subject = subject;
    }
}

class OnlineLession extends Lesson {
    url: string;

    constructor(subject: string, url: string) {
        super(subject);
        this.url = url;
    }
}

let lesson: Lesson;
lesson = new Lesson("coding");
lesson = new OnlineLession("coding", "oreilly.com");

let online: OnlineLession;
online = new OnlineLession("coding", "oreilly.com");
// online = new Lesson("codding"); Lesson에는 OnlineLssion의 속성인 url이 없으므로 에러!

class PastGrades { // 기본 클래스 
    grades: number[] = [];
}

class LabeledPastGrades extends PastGrades { // 하위 클래스 
    label?: string; // 선택적 속성 
}

let subClass: LabeledPastGrades; // 하위 클래스

subClass = new LabeledPastGrades();
subClass = new PastGrades(); 
// 하위 클래스 대신 기본 클래스의 인스턴스 사용 가능 

// 재정의된 생성자
class GradeAnnouncer {
    message: string;

    constructor(grade: number) {
        this.message = grade >= 65 ? "Maybe next time.." : "Your pass!";
    }
}

class PassingAnnouncer extends GradeAnnouncer {
    constructor() {
        super(100);
    }
}

// class FailingAnnouncer extends GradeAnnouncer {
//     constructor() { 
// 하위 클래스의 생성자는 this 또는 super에 적근하기 전 반드시 기본 클래스의 생성자를 호출해야 한다. 
// super()를 호출하기 전 this 또는 super에 접근하면 타입 오류 발생한다. 
//     }
// }

class GradesTally { // 기본 생성자 없으면 자동으로 생성함. 
    grades: number[] = []; // 기본값 []로 지정되는 생성자 자동으로 생김. 

    addGrades(...grades: number[]) {
        this.grades.push(...grades);
        return this.grades.length;
    }
}

class ContinuedGradesTally extends GradesTally {
    constructor(previousGrades: number[]) {
        // this.grades = [...previousGrades]; super()가 먼저 불려야 한다! 

        super();

        console.log("Starting with length", this.grades.length);
    }
}

// 재정의된 메서드 
class GradeCounter {
    countGrades(grades: string[], letter: string) {
        return grades.filter(grade => grade === letter).length;
    }
}

class FailureCounter extends GradeCounter {
    countGrades(grades: string[]) { 
        // 기본 메서드의 첫 번째 매개변수와 반환타입이 같아 OK
        return super.countGrades(grades, "F");
    }
}

class AnyFailureChecker extends GradeCounter {
    // countGrades(grades: string[]) {
    //     return super.countGrades(grades, "F") !== 0;
    // } 반환 타입이 boolean으로 달라서 에러 발생! 
}

class Assignment {
    grade?: number;
}

class GradeAssignment extends Assignment {
    grade: number;

    constructor(grade: number) {
        super();
        this.grade = grade;
    }
}

class NumericGrade {
    value = 0;
}

class VagueGrade extends NumericGrade {
    // value = Math.random() > 0.5 ? 1 : "..."; 
    // number or string 타입은 number 타입에 할당되지 않는다. 
}

abstract class School {
    readonly name: string;

    constructor(name: string) {
        this.name = name;
    }

    abstract getStudentTypes(): string[];
}

class Preschool extends School {
    getStudentTypes() {
        return ["preschooler"];
    }
}

let school: School;

school = new Preschool("Sunnyside Daycare");
// school = new School("somewhere else"); 추상 클래스의 인스턴스는 생성 불가! 

// 멤버 접근성
class Base {
    isPublicImplicit = 0;
    public isPublicExplicit = 1;
    protected isProtected = 2;
    private isPrivate = 3;
    #truePrivate = 4;
}

class Subclass extends Base {
    examples() {
        this.isPublicImplicit;
        this.isPublicExplicit;
        this.isProtected;

        // this.isPrivate; private이라 접근 불가! 
    }
}

new Subclass().isPublicImplicit;
new Subclass().isPublicExplicit;

// new Subclass().isProtected; 클래스 외부에서는 접근 불가
// new Subclass().isPrivate; 클래스 내부에서만 접근 가능 

class TwoKeywords {
    private readonly name: string;

    constructor() {
        this.name = "Anne Sullivan";
    }

    log() {
        console.log(this.name);
    }
}

const two = new TwoKeywords();
// two.name = "Savitribai Phule"; readonly라 변경 불가! 

// 정적 필드 제한자
class Question {
    protected static readonly answer: "bash" = "bash"; // 모든 인스턴스에 대해 공통 존재 
    protected static readonly prompt = "What's an ogre's favorite programming language?";

    guess(getAnswer: (prompt: string) => string) {
        const answer = getAnswer(Question.prompt); // 지역변수 

        if(answer === Question.answer) {
            console.log("You got it!");
        } else {
            console.log("Try again...");
        }
    }
}

const question = new Question();
question.guess(prompt => "bash"); // "You got it!"
question.guess(prompt => "python"); // "Try again..."
// Question.answer; protected라 접근 불가하다. 
