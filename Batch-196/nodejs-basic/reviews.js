//Cú pháp khai báo biến
let myName = "Tuan";
const myAge = 30;
//Cú pháp khai báo hàm

function sayHello(name){
    console.log("Hello " + name);
}
//arrow function
const sayGoodbye = (name) => {
    console.log("Goodbye " + name);
}
//tips khi hàm có nhiều tham số
const sum = (a, b) => {
    return a + b;
}
sum(1, 2); //3
//Khuyến nghị các bạn cấu hình tham số theo kiểu object
const sumV2 = ({a, b}) => {
    return a + b;
}
sumV2({a: 1, b: 2}); //3

//Destructuring với object
const person = {
    name: "Tuan",
    age: 30,
    address: "Hanoi",
    password: "123456"
}

//console.log(person.password); //123456
// const {password} = person; // destructuring
// console.log(password); //123456

//Destructuring với array
const numbers = [1, 2, 3, 4, 5];
console.log(numbers[2]); //3
const [,,third] = numbers; // destructuring
console.log(third); //3


//Spread Operator
const {password, ...safePerson} = person; // rest operator
console.log(safePerson); // {name: "Tuan", age: 30, address: "Hanoi"}

const ojb1 = {a: 1, b: 2};
const ojb2 = {c: 3, d: 4};
const mergedObj = {...ojb1, ...ojb2};
console.log(mergedObj); // {a: 1, b: 2, c: 3, d: 4}