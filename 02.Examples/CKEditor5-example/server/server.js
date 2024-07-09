const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();

//Để bắt được kiểu JSON từ client gửi lên
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
    limit: '50mb'  // 50mb = 50 * 1024 * 1024 bytes = 524,288,000 bytes
}))

app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true
}));



// Thiết lập đường dẫn tĩnh cho thư mục uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Cấu hình CORS
app.use(cors({
    origin: 'http://localhost:5174',
    credentials: true
}));

// Cấu hình Multer để giữ lại đuôi tập tin
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Endpoint xử lý upload file
app.post('/upload', upload.single('upload'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    console.log('File uploaded successfully:', req.file);
    res.json({
        url: `http://localhost:9000/uploads/${req.file.filename}`
    });
});

// Khởi động server
app.listen(9000, () => {
    console.log('Server started on http://localhost:9000');
});
