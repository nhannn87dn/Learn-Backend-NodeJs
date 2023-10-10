import createError from 'http-errors';
import User from  '../models/User.model'

/**
 * Get All Users
 */
const getAllUsers = async () => {
    const users = await User.find();
    return users;
}

/**
 * Get a User by ID
 */
const getUserById = async (id: string) => {
    const user = await User.findById(id);
    if(!user){
        throw createError(404,`User not found`);
    }
    return user;
}

export default {
    getAllUsers,
    getUserById
};
