import express from 'express';
import createError from "http-errors";

const router = express.Router();


const users = [
    {id: 1, name: 'Alice', email: 'alice@example.com'},
    {id: 2, name: 'Bob', email: 'bob@example.com'},
    {id: 3, name: 'Charlie', email: 'charlie@example.com'},
]

// GET /api/v2/users - Lấy danh sách tất cả người dùng (READ)
router.get('/', (req, res)=>{
    res.json(
        users
    );
})

//GET /api/v2/users/:id - Lấy thông tin người dùng theo ID (READ)
router.get('/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const user = users.find(u => u.id === id);
    console.log('<<=== 🚀 user ===>>',user);
    if(!user){
        //throw new Error('User not found');
        throw createError(400, 'User not found');
    }
    return res.json(user);
})

// POST /api/v2/users - Tạo mới một người dùng (CREATE)
router.post('/', (req, res)=>{
    const {name} = req.body;

    console.log('<<=== 🚀 name ===>>',name);

    const newUser = {
        id: users.length + 1,
        name,
        email: `${name.toLowerCase()}@example.com`
    };
    users.push(newUser);
    res.status(201).json(newUser);
});

// PUT /api/v2/users/:id - Cập nhật thông tin người dùng theo ID (UPDATE)
router.put('/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const {name} = req.body;
    //Tìm xem user có tồn tại hay không
    const user = users.find(u => u.id === id);
    if(!user){
        //throw new Error('User not found');
        throw createError(400, 'User not found');
    }
    user.name = name;
    res.json(user);
});


// DELETE /api/v2/users/:id - Xóa người dùng theo ID (DELETE)
router.delete('/:id', (req, res)=>{
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === id);
    if(userIndex === -1){
        //throw new Error('User not found');
        throw createError(400, 'User not found');
    }
    users.splice(userIndex, 1);
    res.status(200).json(
        {message: 'User deleted successfully'}  
    )
});

export default router;