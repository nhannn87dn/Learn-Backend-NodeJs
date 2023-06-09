const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../../models/user.model');


const mongod = new MongoMemoryServer();

/**
 * Kết nối tới cơ sở dữ liệu giả mạo trước khi chạy kiểm thử.
 */
beforeAll(async () => {
  const uri = await mongod.getUri();
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
});

/**
 * Làm sạch cơ sở dữ liệu giữa các kiểm thử.
 */
afterEach(async () => {
  await mongoose.connection.dropDatabase();
});

/**
 * Ngắt kết nối và dừng cơ sở dữ liệu giả mạo sau khi tất cả kiểm thử được hoàn thành.
 */
afterAll(async () => {
  await mongoose.connection.close();
  await mongod.stop();
});

describe('GET /api/v1/users/:id', () => {
  test('It should respond with the user', async () => {
    // Tạo một user mẫu
    const sampleUser = User(
      {
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin@123456',
        role: 'user'
      }
    );
    await sampleUser.create();

    const res = await request(app).get(`/api/v1/users/${sampleUser._id}`);

    expect(res.body.name).toBe('Admin');
    expect(res.body.email).toBe('admin@example.com');
    expect(res.statusCode).toBe(200);
  });

});