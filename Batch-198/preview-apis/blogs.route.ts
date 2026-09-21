import express from 'express';

const router = express.Router();

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  body: string;
  authorName: string;
  views: number;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

const blogs: Blog[] = [
  {
    id: 1,
    title: 'Nhật ký học Web tuần đầu tiên',
    excerpt: 'Những trải nghiệm thú vị khi lần đầu tự tạo API cho riêng mình.',
    body: 'Hôm nay tôi đã hoàn thành bài tập Router trong Express...',
    authorName: 'Khánh Trần',
    views: 120,
    status: 'published',
    createdAt: '2026-03-20T14:00:00.000Z',
  },
];

router.get('/', (req, res) => {
  const data = blogs.map((blog) => ({
    id: blog.id,
    title: blog.title,
    authorName: blog.authorName,
    views: blog.views,
    status: blog.status,
  }));

  return res.status(200).json({
    message: 'Lấy danh sách blog thành công',
    data,
  });
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const blog = blogs.find((item) => item.id === id);

  if (!blog) {
    return res.status(404).json({
      message: 'Không tìm thấy dữ liệu với ID tương ứng',
    });
  }

  return res.status(200).json({
    message: 'Lấy chi tiết blog thành công',
    data: blog,
  });
});

router.post('/', (req, res) => {
  const { title, excerpt, body, authorName, views, status } = req.body;

  const newBlog: Blog = {
    id: blogs.length ? blogs[blogs.length - 1].id + 1 : 1,
    title,
    excerpt,
    body,
    authorName,
    views: Number(views) || 0,
    status: status || 'draft',
    createdAt: new Date().toISOString(),
  };

  blogs.push(newBlog);

  return res.status(201).json({
    message: 'Tạo blog mới thành công',
    data: newBlog,
  });
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = blogs.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: 'Không tìm thấy dữ liệu với ID tương ứng',
    });
  }

  const { title, excerpt, body, authorName, views, status } = req.body;

  blogs[index] = {
    ...blogs[index],
    title: title ?? blogs[index].title,
    excerpt: excerpt ?? blogs[index].excerpt,
    body: body ?? blogs[index].body,
    authorName: authorName ?? blogs[index].authorName,
    views: views !== undefined ? Number(views) : blogs[index].views,
    status: status ?? blogs[index].status,
    updatedAt: new Date().toISOString(),
  };

  return res.status(200).json({
    message: `Cập nhật blog ID ${id} thành công`,
    data: blogs[index],
  });
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = blogs.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: 'Không tìm thấy dữ liệu với ID tương ứng',
    });
  }

  const [deletedBlog] = blogs.splice(index, 1);

  return res.status(200).json({
    message: `Xóa bài blog ID ${deletedBlog.id} thành công`,
    deletedId: deletedBlog.id,
  });
});

export default router;
