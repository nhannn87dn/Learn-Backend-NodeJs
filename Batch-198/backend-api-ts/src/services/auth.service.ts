import { verifyPassword } from "../helpers/password.helper";
import { createToken } from "../helpers/token.helper";
import Staff from "../models/staff.model";
import createError from 'http-errors';

const login = async (email: string, password: string) => {
    //Step 1: Find staff by email
    const staff = await Staff.findOne({ email }).exec();
    if(!staff){
        throw createError(404, "Staff not found");
    }
    //Step 2: Check password

    console.log("staff.password: ", staff.password);
    console.log("password: ", password); 

    const isPasswordValid = await verifyPassword(password, staff.password);
    if(!isPasswordValid){
        throw createError(401, "Invalid email or password");
    }

    //step 3: trả về accessToken và refreshToken cho client
    const payload = {
        _id: staff._id,
        name: staff.name,
        email: staff.email,
        role: staff.role
    }
    const accessToken = createToken(payload, '7d');
    const refreshToken = createToken(payload, '30d');

    return {
        accessToken,
        refreshToken
    }
}

export default {
    login
}