//https://www.w3schools.com/js/js_destructuring.asp

let arrs = ["orange", "tomato", "apple"];

// arrs[1] = "kiwi";
// console.log("<<=== 🚀 arrs ===>>", arrs);
arrs = arrs.map((item) => (item === "tomato" ? "kiwi" : item));

//In ra Apple
//console.log(arrs[2]);
// const [cam, , tao] = arrs;

// console.log("<<=== 🚀 cam ===>>", cam);

//TH2: Tach mang ra nhieu phan
const [pack_one, ...pack_two] = arrs;
//https://www.w3schools.com/howto/howto_js_spread_operator.asp
// console.log("<<=== 🚀 pack_one ===>>", pack_one);
// console.log("<<=== 🚀pack_two  ===>>", pack_two);

let myProfile = {
  id: 1,
  name: "Nhan",
  isTeacher: true,
  password: "mypassword",
};

const { password, ...userInfo } = myProfile;

//console.log(password, userInfo);

// myProfile.id = 2;
// console.log("<<=== 🚀 myProfile ===>>", myProfile);

myProfile = { ...myProfile, id: 2, email: "nhan@gmail.com" };
//console.log("<<=== 🚀 myProfile ===>>", myProfile);
//TH 1: Can in ra name
//console.log(myProfile.name);
//
const { name, id } = myProfile;
//console.log("<<=== 🚀 name ===>>", name, id);

function hello() {
  console.log("hello js");
}
hello();

//arrow function \n \s
const sayHello = () => console.log("hello js");
sayHello();

const sayHelloName = (name) => console.log("Hello", name);
sayHelloName("Sang");
sayHelloName("An");
