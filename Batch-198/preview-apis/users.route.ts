import express from 'express';

const router = express.Router();

interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  age: number;
  role: string;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const users: User[] = [
  {
    id: 1,
    username: 'hong_nguyen',
    email: 'hong.nguyen@example.com',
    fullName: 'Nguyễn Thị Hồng',
    age: 20,
    role: 'student',
    isActive: true,
    createdAt: '2026-01-15T09:30:00.000Z',
  },
];

router.get('/', (req, res) => {
  const data = users.map((user) => ({
    id: user.id,
    username: user.username,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
    isActive: user.isActive,
  }));

  return res.status(200).json({
    message: 'Lấy danh sách người dùng thành công',
    data,
  });
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({
      message: 'Không tìm thấy dữ liệu với ID tương ứng',
    });
  }

  return res.status(200).json({
    message: 'Lấy thông tin người dùng thành công',
    data: user,
  });
});

router.post('/', (req, res) => {
  const { username, email, fullName, age, role, isActive } = req.body;

  const newUser: User = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    username,
    email,
    fullName,
    age: Number(age) || 0,
    role: role || 'student',
    isActive: Boolean(isActive),
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  return res.status(201).json({
    message: 'Thêm người dùng mới thành công',
    data: newUser,
  });
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: 'Không tìm thấy dữ liệu với ID tương ứng',
    });
  }

  const { username, email, fullName, age, role, isActive } = req.body;

  users[index] = {
    ...users[index],
    username: username ?? users[index].username,
    email: email ?? users[index].email,
    fullName: fullName ?? users[index].fullName,
    age: age !== undefined ? Number(age) : users[index].age,
    role: role ?? users[index].role,
    isActive: isActive ?? users[index].isActive,
    updatedAt: new Date().toISOString(),
  };

  return res.status(200).json({
    message: `Cập nhật thông tin người dùng ID ${id} thành công`,
    data: users[index],
  });
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: 'Không tìm thấy dữ liệu với ID tương ứng',
    });
  }

  const [deletedUser] = users.splice(index, 1);

  return res.status(200).json({
    message: `Xóa người dùng ID ${deletedUser.id} thành công`,
    deletedId: deletedUser.id,
  });
});

export default router;
