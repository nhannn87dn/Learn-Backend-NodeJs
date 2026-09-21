import express from 'express';

const router = express.Router();

interface Game {
  id: number;
  title: string;
  genre: string;
  platforms: string[];
  releaseYear: number;
  rating: number;
  price: number;
  isMultiplayer: boolean;
  createdAt?: string;
  updatedAt?: string;
}

const games: Game[] = [
  {
    id: 1,
    title: 'Black Myth: Wukong',
    genre: 'Action RPG',
    platforms: ['PC', 'PlayStation 5'],
    releaseYear: 2024,
    rating: 9.5,
    price: 59.99,
    isMultiplayer: false,
  },
];

router.get('/', (req, res) => {
  const data = games.map((game) => ({
    id: game.id,
    title: game.title,
    genre: game.genre,
    price: game.price,
    rating: game.rating,
  }));

  return res.status(200).json({
    message: 'Lấy danh sách trò chơi thành công',
    data,
  });
});

router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const game = games.find((item) => item.id === id);

  if (!game) {
    return res.status(404).json({
      message: 'Không tìm thấy dữ liệu với ID tương ứng',
    });
  }

  return res.status(200).json({
    message: 'Lấy chi tiết trò chơi thành công',
    data: game,
  });
});

router.post('/', (req, res) => {
  const { title, genre, platforms, releaseYear, rating, price, isMultiplayer } = req.body;

  const newGame: Game = {
    id: games.length ? games[games.length - 1].id + 1 : 1,
    title,
    genre,
    platforms: Array.isArray(platforms) ? platforms : [],
    releaseYear: Number(releaseYear) || 0,
    rating: Number(rating) || 0,
    price: Number(price) || 0,
    isMultiplayer: Boolean(isMultiplayer),
    createdAt: new Date().toISOString(),
  };

  games.push(newGame);

  return res.status(201).json({
    message: 'Thêm game mới thành công',
    data: newGame,
  });
});

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = games.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: 'Không tìm thấy dữ liệu với ID tương ứng',
    });
  }

  const { title, genre, platforms, releaseYear, rating, price, isMultiplayer } = req.body;

  games[index] = {
    ...games[index],
    title: title ?? games[index].title,
    genre: genre ?? games[index].genre,
    platforms: Array.isArray(platforms) ? platforms : games[index].platforms,
    releaseYear: releaseYear !== undefined ? Number(releaseYear) : games[index].releaseYear,
    rating: rating !== undefined ? Number(rating) : games[index].rating,
    price: price !== undefined ? Number(price) : games[index].price,
    isMultiplayer: isMultiplayer ?? games[index].isMultiplayer,
    updatedAt: new Date().toISOString(),
  };

  return res.status(200).json({
    message: `Cập nhật trò chơi ID ${id} thành công`,
    data: games[index],
  });
});

router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = games.findIndex((item) => item.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: 'Không tìm thấy dữ liệu với ID tương ứng',
    });
  }

  const [deletedGame] = games.splice(index, 1);

  return res.status(200).json({
    message: `Xóa trò chơi ID ${deletedGame.id} thành công`,
    deletedId: deletedGame.id,
  });
});

export default router;
