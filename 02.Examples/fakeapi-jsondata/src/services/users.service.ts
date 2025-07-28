import path from 'path';
import createError from "http-errors";
import { writeFile, readFile } from '../helpers/fileHandler';
import { IUser, IUserCreate, IUserUpdate } from '../types/user';

const USER_PATH = path.join(__dirname, '../databases/user.json');

// Helper để đọc toàn bộ user
async function getAllUsers(): Promise<IUser[]> {
  try {
    const data = await readFile(USER_PATH);
    return Array.isArray(data) ? (data as IUser[]) : [];
  } catch {
    return [];
  }
}

const findAll = async (query: any) => {
  let users: IUser[] = await getAllUsers();
  return {
    data: users.slice((query.page - 1) * query.limit, query.page * query.limit), //return data with limit and page
    totalRecords: users.length,
    page: query.page || 1,
    limit: query.limit || 10,
    totalPages: Math.ceil(users.length / (query.limit || 10)),
  };
};

const findById = async (id: string) => {
  const users = await getAllUsers();
  const user = users.find((u: IUser) => String(u.id) === String(id));
  if (!user) throw createError(404, "User not found");
  return user;
};

const create = async (payload: IUserCreate) => {
  const users = await getAllUsers();
  const newUser = {
    ...payload,
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    createdAt: new Date().toISOString(),
  };
  users.push(newUser);
  await writeFile(USER_PATH, users);
  return newUser;
};

const updateById = async (id: string, payload: IUserUpdate) => {
  const users = await getAllUsers();
  const idx = users.findIndex((u: any) => String(u.id) === String(id));
  if (idx === -1) throw createError(404, "User not found");
  users[idx] = { ...users[idx], ...payload };
  await writeFile(USER_PATH, users);
  return users[idx];
};

const deleteById = async (id: string) => {
  const users = await getAllUsers();
  const idx = users.findIndex((u: any) => String(u.id) === String(id));
  if (idx === -1) throw createError(404, "User not found");
  const deleted = users.splice(idx, 1)[0];
  await writeFile(USER_PATH, users);
  return deleted;
};

export default {
  findAll,
  findById,
  create,
  deleteById,
  updateById,
};
