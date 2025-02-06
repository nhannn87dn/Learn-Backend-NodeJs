// 2. Object

let myProfile = {
    id: 1,
    name: "Nhan",
    isTeacher: true,
    password: "mypassword",
}
console.log(myProfile.name);
//destructuring
let {name, id} = myProfile;
console.log(name, id);
// Them phan tu moi vao object
myProfile.age = 30; //cach binh thuong
console.log(myProfile);
//su dung spread operator
myProfile = {...myProfile, address: "Ha Noi"}; //cach moi
console.log(myProfile);
/**
 * Lấy ra thuộc password
 * Còn tất cả thuộc còn lại lưu vào biến safeProfile
 */
let {password, ...safeProfile} = myProfile;
console.log(safeProfile);
//ngoai cach tren ban co the su dung lodash

// Cap nhat gia tri cua object
safeProfile.age = 25; //cach cu
console.log(safeProfile);
safeProfile = {...safeProfile, age: 26}; //cach moi

//Gop 2 object lại voi nhau
let fruit_one = {name: "apple", color: "red"};
let fruit_two = {name: "banana", color: "yellow"};
let fruits = {...fruit_one, ...fruit_two};// sư dung spread operator

//3 - Function
//3.1 - Arrow function
const sayHello = (name) => {
    console.log("Hello", name);
}

const sayHello2 = (name) => console.log("Hello", name);

//3.2 -hàm ko tên anonymous function
const sayHello3 = function(name) {
    console.log("Hello", name);
}
//3.3 hàm truyền thống
function sayHello4(name) {
    console.log("Hello", name);
}
//Tips khi hàm có nhiều tham số
const sum = (a, b, c, d) => a + b + c + d;
//Khi gọi hàm
console.log(sum(1, 2, 3, 4));//
//Cách viết khác tối ưu hơn
//Áp dung destructuring để truyền tham số cho hàm có nhiều tham số
const sumV2 = ({a,b,c,d})=> {
    return a + b + c + d;
}
console.log(sumV2({d: 4, b: 2, c: 3, a: 1}));
