import express from 'express';

const router = express.Router();

// GET /api/v1/students
router.get('/', (req, res)=>{
    res.json({message: 'Get all students'});
})

export default router;