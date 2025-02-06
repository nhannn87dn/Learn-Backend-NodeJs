import { faker } from '@faker-js/faker';

const randomInt = faker.number.int({ min: 1, max: 21 }); 
console.log(randomInt);