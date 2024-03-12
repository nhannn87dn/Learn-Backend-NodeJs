# Prerequisites

## 💛1. Cài đặt các Extensions cho Visual Studio Code

- ESLint (Microsoft)
- IntelliCode (Microsoft)
- JavaScript (ES6) code snippets (charalampos karypidis)
- ES7+ React/Redux/React-Native snippets (dsznajder)
- Prettier - Code formatter (Prettier)
- TSLint (Microsoft)
- Better Comments (Aaron Bond)


## 💛 2. JavaScript (ES Next)


## 🔶 JavaScript let

The let keyword allows you to declare a variable with block scope.

```js
var x = 10;
// Here x is 10
{
  let x = 2;
  // Here x is 2
}
// Here x is 10
```

## 🔶 JavaScript const

The const keyword allows you to declare a constant (a JavaScript variable with a constant value).

Constants are similar to let variables, except that the value cannot be changed.

```js
var x = 10;
// Here x is 10
{
  const x = 2;
  // Here x is 2
}
// Here x is 10
```

## 🔶 Arrow Functions

Arrow functions allows a short syntax for writing function expressions.

You don't need the function keyword, the return keyword, and the curly brackets.

Arrow functions do not have their own this. They are not well suited for defining object methods.

Arrow functions are not hoisted. They must be defined before they are used.

Using const is safer than using var, because a function expression is always a constant value.

```js
// ES5
var x = function (x, y) {
  return x * y;
};

// ES6
const x = (x, y) => x * y;

// or
const x = (x, y) => {
  return x * y;
};
```

## 🔶 Array.map()


```js

// Arrow function
map((element) => { /* … */ })
map((element, index) => { /* … */ })
map((element, index, array) => { /* … */ })

// Callback function
map(callbackFn)
map(callbackFn, thisArg)

// Inline callback function
map(function (element) { /* … */ })
map(function (element, index) { /* … */ })
map(function (element, index, array) { /* … */ })
map(function (element, index, array) { /* … */ }, thisArg)

```

JavaScript Demo: Array.map()

```js
const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]
```

Using map to reformat objects in an array

```js
const kvArray = [
  { key: 1, value: 10 },
  { key: 2, value: 20 },
  { key: 3, value: 30 },
];

const reformattedArray = kvArray.map(({ key, value }) => ({ [key]: value }));

console.log(reformattedArray); // [{ 1: 10 }, { 2: 20 }, { 3: 30 }]

```

## 🔶 Destructing Arrays


```js
const vehicles = ['mustang', 'f-150', 'expedition'];
const [car, truck, suv] = vehicles;
```

If we only want the car and suv we can simply leave out the truck but keep the comma:

```js
const vehicles = ['mustang', 'f-150', 'expedition'];
const [car,, suv] = vehicles;
```

Destructuring comes in handy when a function returns an array:

```js
function calculate(a, b) {
  const add = a + b;
  const subtract = a - b;
  const multiply = a * b;
  const divide = a / b;

  return [add, subtract, multiply, divide];
}

const [add, subtract, multiply, divide] = calculate(4, 7);
```

## 🔶 Destructing Objects

Có một object

```js
const vehicleOne = {
  brand: 'Ford',
  model: 'Mustang',
  type: 'car',
  year: 2021, 
  color: 'red'
}
```

Để lấy được tên Ford từ object trên

Cách cũ: 

```js
let brand  = vehicleOne.brand;
```

Với Destructing

```js
let {brand} = vehicleOne;
```


Sử dụng với hàm

```js

myVehicle(vehicleOne);

// old way
function myVehicle(vehicle) {
  const message = 'My ' + vehicle.type + ' is a ' + vehicle.color + ' ' + vehicle.brand + ' ' + vehicle.model + '.';
}
```

Với destructuring


```js
function myVehicle({type, color, brand, model}) {
  const message = 'My ' + type + ' is a ' + color + ' ' + brand + ' ' + model + '.';
}
```

## 🔶 ES6 Spread Operator

The JavaScript spread operator (...) allows us to quickly copy all or part of an existing array or object into another array or object.

```js
const numbersOne = [1, 2, 3];
const numbersTwo = [4, 5, 6];
const numbersCombined = [...numbersOne, ...numbersTwo];
```

Assign the first and second items from numbers to variables and put the rest in an array:


```js
const numbers = [1, 2, 3, 4, 5, 6];
const [one, two, ...rest] = numbers
```

Combine these two objects:

```js
const myVehicle = {
  brand: 'Ford',
  model: 'Mustang',
  color: 'red'
}

const updateMyVehicle = {
  type: 'car',
  year: 2021, 
  color: 'yellow'
}

const myUpdatedVehicle = {...myVehicle, ...updateMyVehicle}
```