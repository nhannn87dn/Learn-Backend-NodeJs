import testModel from "../models/test.model";

const newTest = new testModel({
        name: 'Tomy',
        age: 25,
        email: 'nhan@gmail.com',
        birthDay: new Date(),
        address: {
            street: '123 Main St',
            city: 'New York',
            state: 'NY',
            country: 'US'
        },
        roles: ['Admin']
    })
    //ưu lai
    newTest.save();