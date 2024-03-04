//ES6

let arrs = [1, 2, 3, 4, 5, 6, 7];
let arrss = [8, 9, 10];

//Bổ sung phần tử mới vào mảng
//arrs = [...arrs, 8];

//console.log(arrs);

//Truy cập đến một phần tử của mảng
const [, , three, ...agrs] = arrs;
//console.log(agrs);

//Gộp 2 mảng lại với nhau
const newArr = [...arrs, ...arrss];
console.log(newArr);
