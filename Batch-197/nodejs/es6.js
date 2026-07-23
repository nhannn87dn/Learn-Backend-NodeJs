function sum(a,b){
    return a + b;
}

const sumV2 = (a, b)=>{
    return a + b
}

const sumV3 = (a, b)=>a + b;


let vehicleOne = {
  brand: 'Ford',
  model: 'Mustang',
  type: 'car',
  year: 2021, 
  color: 'red'
}
//console.log(vehicleOne.model);
const {model} = vehicleOne;
console.log('<<=== 🚀 model ===>>',model); //destructuring 

//Cần update year ==> 2026
//vehicleOne.year = 2026; //dùng key để gán value mới
//console.log('<<=== 🚀 vehicleOne ===>>',vehicleOne);
vehicleOne = {...vehicleOne, year: 2027} // overwrite lại value cho key year
console.log('<<=== 🚀 vehicleOne ===>>',vehicleOne);
//thêm vào một trường mới seats: 4;
vehicleOne = {...vehicleOne, seats: 4}; // add
console.log('<<=== 🚀 vehicleOne ===>>',vehicleOne);


//
const objOne = {
    a: 'a',
    b: 'b'
}

const objTwo = {
    c: 'c',
    d: 'd'
}
// gộp 2 obj trên làm thành một object mới ?
const objThree = {...objOne, ...objTwo};
console.log('<<=== 🚀 objThree ===>>',objThree);

const users ={
    id: 1,
    email: 'abc@gmail.com',
    password: 'example@123'
}
//Làm sao để trả về thông tin user mà ko bao gồm password
console.log('<<=== 🚀 users ===>>',users);
const {password, ...safeUser} = users;
console.log('<<=== 🚀  safeUser===>>',safeUser);
