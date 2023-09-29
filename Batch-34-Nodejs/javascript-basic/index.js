let name = 'Nhan';
let myAge = 35;

const user = {id: 1, name: 'John'}

{
    console.log(name);
}
/**
 * Quy tắc đặt tên biến và hàm ==> camel Case
 */
function sayHello(){
    console.log('Hello');
}

sayHello();

function sayHelloWithName(name){
    console.log('Hello with name: ' + name);
}

sayHelloWithName('Phat');

//Arrow function
const sayHellov2 = ()=>{
    console.log('Hello');
}
// Hàm có return về kết quả
// const sum = (a,b)=>{
//     return a + b;
// }

const sum = (a,b)=> a + b; //short hand


const array = [1, 4, 9, 16];

const map1 = array.map(x=> {
    if(x == 4){
        return x * 2;
    }

    return x;
});

console.log(map1);
///ES6
//Destructuring
let vehicles = ['mustang', 'f-150', 'expedition'];
let vehiclesSecond = ['new2']

//Thêm phần tử mới vào mảng
vehicles = [...vehicles, 'new'];

//Gộp 2 mảng ['mustang', 'f-150', 'expedition', 'new2'];
const MangMoi = [...vehicles, ...vehiclesSecond];


console.log('vehicles',vehicles);

console.log(vehicles[2]);

const [m1] = vehicles;
console.log(m1); //==> mustang

const [ , ,m3] = vehicles;
console.log(m3); //==> expedition

let vehicleOne = {
    brand: 'Ford',
    model: 'Mustang',
    type: 'car',
    year: 2021, 
    color: 'red'
    
}

console.log(vehicleOne.brand);

//Truy cập vào object
const {brand} = vehicleOne; //Ford
//Thêm mới
// vehicleOne.wheels = 4;//cách củ
vehicleOne = {...vehicleOne, wheels: 4}

console.log('<<=== 🚀 vehicleOne ===>>',vehicleOne);

