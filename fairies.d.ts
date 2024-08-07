
declare function canGrantWish(wish: string): boolean;

// declare function grantWish(wish: string) {
//     return true;
// } 본문 설정하면 구문 오류난다. 

class Fairy {
    canGrantWish(wish: string): boolean;
}