import createError from 'http-errors';
import staffService from './staffs.service';
import { hashPassword, verifyPassword } from '../helpers/password.helper';
import { createToken } from '../helpers/token.helper';

// Làm tính năng xác thực đăng nhập cho nhân viên (staff) và quản trị viên (admin)
const login = async (email: string, password: string) => {
    //Bước 1:L xác thực email xem tồn tại không
    const staff = await staffService.verifyUserByEmail(email);

    if (!staff) {
        throw createError(400, 'Invalid email or password');
    }
    //Bước 2: Xác thực password xem đúng không
    const isPasswordValid = await verifyPassword(staff.password, password);
    if (!isPasswordValid) {
        throw createError(400, 'Invalid email or password');
    }
    //Bước 3: Nếu đúng email và password thì trả về accessToken và refreshToken cho client
    const payloadToken = {
        sub: staff._id,
        role: staff.role,
        email: staff.email,
        name: staff.name
    };
    const accessToken = createToken(payloadToken, '1h');
    const refreshToken = createToken(payloadToken, '7d');
    return {
        user: {
            id: staff._id,
            name: staff.name,
            email: staff.email,
            role: staff.role,
        },
        accessToken,
        refreshToken,
    };
}

const changePassword = async (staffId: string, oldPassword: string, newPassword: string) => {
    //Bước 1: Xác thực xem staffId có tồn tại không
    const staff = await staffService.findById(staffId);
    //Bước 2: Xác thực xem oldPassword có đúng không
    const isPasswordValid = await verifyPassword(staff.password, oldPassword);
    if (!isPasswordValid) {
        throw createError(400, 'Old password is incorrect');
    }
    //Bước 3: Hash newPassword trước khi lưu
    const hashedPassword = await hashPassword(newPassword);
    staff.password = hashedPassword;
    await staff.save();
    return {
        message: 'Password changed successfully',
    };
}

export default {
    login,
    changePassword,
};