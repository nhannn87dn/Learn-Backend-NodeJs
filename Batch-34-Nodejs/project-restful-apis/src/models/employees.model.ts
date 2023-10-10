import { Schema, model } from 'mongoose';

const employeeSchema = new Schema({

});


const Employee = model('Employee', employeeSchema);
export default Employee;