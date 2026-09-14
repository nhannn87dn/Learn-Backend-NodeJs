function sayHello(name) {
     console.log(`Hello, ${name}!`);
}

// const sayHelloV2 = (name) => {
//     console.log(`Hello, ${name}!`);
// }

const sayHelloV2 = (name) => (console.log(`Hello, ${name}!`));

// sayHello('Alice');
// sayHelloV2('Bob');


const numbers = [1, 2, 3, 4];
const doubled = numbers.map(num => num * 2);

console.log(doubled); // Kết quả: [2, 4, 6, 8]
console.log(numbers); // Kết quả: [1, 2, 3, 4] (mảng gốc không thay đổi)


//Destructing Objects, REST Operator, Spread Operator

const vehicleOne = {
  brand: 'Ford',
  model: 'Mustang',
  type: 'car',
  year: 2021, 
  color: 'red'
}

const {year} = vehicleOne;
console.log('<<=== 🚀 year ===>>',year);

let user = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'securepassword'
}

const {password, ...safeUser} = user;

console.log('<<=== 🚀 user ===>>',user);
console.log('<<=== 🚀 safeUser ===>>',safeUser);

user = {...user, age: 30, country: 'USA'};
user = {...user, name: 'Jane Smith'};
console.log('<<=== 🚀 user ===>>',user);