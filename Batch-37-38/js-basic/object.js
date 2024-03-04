let user = { id: 1, name: "Softech", password: "123456", childs: { id: 1 } };
let users = { gender: "male" };
//1.Truy cập vào giá trị của phần tử trong object
const { name } = user;
//console.log(name);

const { password, ...results } = user;
///console.log(results);
///

//2. Thêm phần tử vào object
user = { ...user, email: "softech@gmail.com" };

//3.Thay đổi giá trị của phần tử trong object
user = { ...user, password: "123456@" };

//4 thay đổi giá trị của sub object
user = { ...user, childs: { ...user.childs, id: 2 } };

//5 . gộp 2 objects
const newObject = { ...user, ...users };
console.log(newObject);
