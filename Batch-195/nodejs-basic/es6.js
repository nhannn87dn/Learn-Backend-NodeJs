function sum(a: number, b: number) {
  return a + b;
}




const sumV2 = (a, b) => {
    return a + b;
}

const sumV3 = (a, b) =>  a + b;


const sumV4 = ({a, b}) =>  a + b;

sumV4({b: 10, a: 5});

const name = 'Alice';
console.log(`Hello, ${name}!`);

interface TUser {
    name: String;
    age: Number;
    location: String,
    password: String,
}

let user: TUser  = { 
    name: 'Alice', 
    age: 30, 
    location: 'New York',
    password: '123'
};

interface TUserB extend TUser {
    email: string
}


let userb  = { 
    name: 'Tom', 
    age: 37, 
    location: 'New York',
    password: '123',
    email: 'ndsjdsjd'
};


console.log(user.age); // 30
const {age} = user;

console.log(age);
//user.email = 'dsds'
//user.age = 36;
user = {...user, age: 36} // update
user = {...user, email: 'email'} //add pro
console.log('<<=== 🚀 user ===>>',user);

//rest 
const {password, ...safeUser} = user;
console.log('<<=== 🚀 safeUser ===>>',safeUser);

const colors = ['red', 'green', 'blue'];
console.log(colors[2]);
const [, , b] = colors;
console.log('b', b);