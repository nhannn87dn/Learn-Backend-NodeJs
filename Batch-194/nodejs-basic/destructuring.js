// const person = {
//     name: 'Alice',
//     age: 30,
//     address: {
//         city: 'Wonderland',
//         zip: '12345'
//     }
// };

// console.log(person.name); // Alice

// //destructuring
// const {name, address} = person;
// console.log(name); // Alice
// console.log(address.city); // Wonderland

// function sum(a, b) {
//     return a + b;
// }
// const res = sum(5, 10, 20);
// console.log(res); // 15

// const sumV2 = ({a, b})=>{
//     return a + b;
// }
// const resV2 = sumV2({b: 10, a: 5, c: 20});
// console.log(resV2); // 15

let user = {
    id: 1,
    username: 'john_doe',
    password: 'securepassword',
}
const {password, ...userWithoutPassword} = user;

console.log(userWithoutPassword);

user.email = 'john_doe@example.com';

user = {...user, age: 30};
user = {...user, password: '123456'};

console.log('<<=== 🚀 user ===>>',user);