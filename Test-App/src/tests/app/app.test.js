const request = require('supertest');
const app = require('../../app');


test('GET /api/v1 should return API version', async () => {
    const response = await request(app).get('/api/v1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ version: 'API 1.0' });
  });
  