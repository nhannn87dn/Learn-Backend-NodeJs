import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Hash mật khẩu
 * @param {string} rawPassword - Mật khẩu cần hash
 * @returns {Promise<string>} - Trả về một promise chứa mật khẩu đã hash
 */
export async function hashPassword(rawPassword: string): Promise<string> {
    try {
        const salt = await bcrypt.genSalt(SALT_ROUNDS);
        const hashedPassword = await bcrypt.hash(rawPassword, salt);
        return hashedPassword;
    } catch (error: any) {
        throw new Error('Error hashing password: ' + error.message);
    }
}

/**
 * Kiểm tra mật khẩu
 * @param {string} rawPassword - Mật khẩu cần kiểm tra
 * @param {string} hashedPassword - Mật khẩu đã hash
 * @returns {Promise<boolean>} - Trả về một promise chứa kết quả kiểm tra
 */
export async function comparePassword(rawPassword: string, hashedPassword: string): Promise<boolean> {
    try {
        const isMatch = await bcrypt.compare(rawPassword, hashedPassword);
        return isMatch;
    } catch (error: any) {
        throw new Error('Error comparing password: ' + error.message);
    }
}
