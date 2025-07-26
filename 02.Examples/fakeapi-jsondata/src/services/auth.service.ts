import createError from "http-errors";
import { generateToken } from "../utils/token.util";
import { IUser } from "../types/user";
import path from 'path';
import { readFile } from '../helpers/fileHandler';

const USER_PATH = path.join(__dirname, '../databases/user.json');

async function getAllUsers(): Promise<IUser[]> {
  try {
    const data = await readFile(USER_PATH);
    return Array.isArray(data) ? (data as IUser[]) : [];
  } catch {
    return [];
  }
}

const verifyUserByCredentials = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const users = await getAllUsers();
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw createError(401, 'Email hoặc mật khẩu không đúng');
  const tokens = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });
  return tokens;
};

const refreshToken = async (user: IUser) => {
  const tokens = generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });
  return tokens;
};

const getProfile = async (email: string) => {
  const users = await getAllUsers();
  const user = users.find(u => u.email === email);
  if (!user) throw createError(401, 'Email không tồn tại');
  return user;
};

export default {
  verifyUserByCredentials,
  refreshToken,
  getProfile
};