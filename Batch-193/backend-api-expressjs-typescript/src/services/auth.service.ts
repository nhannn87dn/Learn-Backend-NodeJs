import Staff from "../models/Staff.model";
import createError from "http-errors";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/token.util";
import { IStaff } from "../types/model";


const verifyUserByCredentials = async ({
    email,
    password,
}: {
    email: string;
    password: string;
}) => {
    //b1. Tìm kiếm người dùng theo email
    const staff = await Staff.findOne({ email });
    if (!staff) {
        throw createError(400, "Email or password is invalid");
    }
    //b2. So sánh password
    const passwordHash = staff.password;
    const isValid = await bcrypt.compare(password, passwordHash); // true
    if(!isValid){
        //Đừng thông báo: Sai mật mật khẩu. Hãy thông báo chung chung
        throw createError(400, "Invalid email or password")
    }
    //b3. Nếu thành công, trả về tokens
    console.log('<<=== 🚀 staff ===>>',staff);
    const tokens = generateToken({
        id: staff._id,
        email: staff.email,
        roles: staff.roles,
    })
    return tokens;
}


const refreshToken = async (staff: IStaff) => {
    const tokens = generateToken({
        id: staff._id,
        email: staff.email,
        roles: staff.roles,
    });
    return tokens;
}

const getProfile =  async(staff: IStaff)=>{
    return staff
}

export default {
    verifyUserByCredentials,
    refreshToken,
    getProfile
}