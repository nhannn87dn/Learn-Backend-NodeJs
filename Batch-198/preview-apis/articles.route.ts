import express from 'express';

const router = express.Router();

interface Article {
  id: number;
  title: string;
  summary: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: 'Hướng dẫn tổ chức Route trong Express.js',
    summary: 'Tổng quan cách phân chia và quản lý các API endpoint hiệu quả.',
    content: 'Nội dung chi tiết về việc sử dụng express.Router() để tách file...',
    author: 'Phúc Nguyễn',
    category: 'Lập trình Backend',
    tags: ['nodejs', 'express', 'javascript'],
    isPublished: true,
    createdAt: '2026-03-21T08:00:00.000Z',
  },
];

router.get('/', (req, res) => {
  const data = articles.map((article) => ({
    id: article.id,
    title: article.title,
    author: article.author,
    category: article.category,
    isPublished: article.isPublished,
  }));

  return res.status(200).json({
    message: 'Lấy danh sách bài viết thành công',
    data,
  });
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const article = articles.find((item) => item.id === id);

  if (!article) {
    return res.status(404).json({
      message: 'Không tìm thấy dữ liệu với ID tương ứng',
    });
  }

  return res.status(200).json({
    message: 'Lấy chi tiết bài viết thành công',
    data: article,
  });
});

router.post('/', (req, res) => {
  const { title, summary, content, author, category, tags, isPublished } = req.body;

  const newArticle: Article = {
    id: articles.length ? articles[articles.length - 1].id + 1 : 1,
    title,
    summary,
    content,
    author,
    category,
    tags: Array.isArray(tags) ? tags : [],
    isPublished: Boolean(isPublished),
    createdAt: new Date().toISOString(),
  };

  articles.push(newArticle);

  return res.status(201).json({
    message: 'Tạo bài viết mới thành công',
    data: newArticle,
  });
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = articles.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: 'Không tìm thấy dữ liệu với ID tương ứng',
    });
  }

  const { title, summary, content, author, category, tags, isPublished } = req.body;

  articles[index] = {
    ...articles[index],
    title: title ?? articles[index].title,
    summary: summary ?? articles[index].summary,
    content: content ?? articles[index].content,
    author: author ?? articles[index].author,
    category: category ?? articles[index].category,
    tags: Array.isArray(tags) ? tags : articles[index].tags,
    isPublished: isPublished ?? articles[index].isPublished,
    updatedAt: new Date().toISOString(),
  };

  return res.status(200).json({
    message: `Cập nhật bài viết ID ${id} thành công`,
    data: articles[index],
  });
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = articles.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: 'Không tìm thấy dữ liệu với ID tương ứng',
    });
  }

  const [deletedArticle] = articles.splice(index, 1);

  return res.status(200).json({
    message: `Xóa bài viết ID ${deletedArticle.id} thành công`,
    deletedId: deletedArticle.id,
  });
});

export default router;
