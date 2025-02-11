import express from 'express';

const router = express.Router();

// GET /api/v1/categories
router.get('/categories', (req, res) => {
  res.send('categories');
});

export default router;