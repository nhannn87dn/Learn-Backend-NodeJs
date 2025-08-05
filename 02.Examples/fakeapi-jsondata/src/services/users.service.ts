import path from 'path';
import createError from "http-errors";
import { writeFile, readFile } from '../helpers/fileHandler';
import { IUser, IUserCreate, IUserUpdate } from '../types/user';

const USER_PATH = path.join(__dirname, '../databases/user.json');

// Helper để đọc toàn bộ user
async function getAllUsers(): Promise<IUser[]> {
  try {
    const data = await readFile(USER_PATH);
   return Array.isArray(data) ? (data as IUser[]).sort((a, b) => b.id - a.id) : [];
  } catch {
    return [];
  }
}

const findAll = async (query: any) => {
  let users: IUser[] = await getAllUsers();

  const page = query.page || 1;
  const limit = query.limit || 10;
  const skip = (page - 1) * limit;
  const offset = page * limit;
  //1 = 0 10
  //2 = 10 20

  return {
     data: users.filter((p) =>  p.id >= skip && p.id < offset ),
      totalRecords: users.length,
      page,
      limit,
      totalPages: Math.ceil(users.length / limit),
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

const updateUserRole = async (id: string, role: string) => {
  const users = await getAllUsers();
  const idx = users.findIndex((u: any) => String(u.id) === String(id));
  if (idx === -1) throw createError(404, "User not found");
  users[idx].role = role;
  await writeFile(USER_PATH, users);
};

const assignPermissions = async (id: string, permissions: string[]) => {
  const users = await getAllUsers();
  const idx = users.findIndex((u: any) => String(u.id) === String(id));
  if (idx === -1) throw createError(404, "User not found");
  // mix  old permissions with new permissions
  users[idx].permissions = [...users[idx].permissions, ...permissions];
  await writeFile(USER_PATH, users);
};

const removePermissions = async (id: string, permissions: string[]) => {
  const users = await getAllUsers();
  const idx = users.findIndex((u: any) => String(u.id) === String(id));
  if (idx === -1) throw createError(404, "User not found");
  users[idx].permissions = users[idx].permissions.filter((p: string) => !permissions.includes(p));
  await writeFile(USER_PATH, users);
};

const removePermission = async (id: string, permission: string) => {
  const users = await getAllUsers();
  const idx = users.findIndex((u: any) => String(u.id) === String(id));
  if (idx === -1) throw createError(404, "User not found");
  users[idx].permissions = users[idx].permissions.filter((p: string) => p !== permission);
  await writeFile(USER_PATH, users);
};

export default {
  findAll,
  findById,
  create,
  deleteById,
  updateById,
  updateUserRole,
  assignPermissions,
  removePermissions,
  removePermission
};
