const request = require('supertest');
const { faker } = require('@faker-js/faker');
const buildSlug = require('../../helpers/buildSlug');
const app = require('../../app');
const { connectDB, disconnectDB } = require('../../helpers/mongooseDB');
const configs = require('../../constants/configs');

const agent = request.agent(app);
let server;

beforeAll(async () => {
  await connectDB()
  .then(() => {
    server = app.listen(configs.PORT, () => {
      console.log(`Server started on port ${configs.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
});

afterAll(async () => {
  await disconnectDB();
  await server.close();
});

describe('GET /api/v1/brands/:id', () => {
  
    test('should return 400 if id is not in the correct format', async () => {
        const response = await agent.get('/api/v1/brands/invalid_id');
    
        expect(response.status).toBe(400);
        expect(response.body).toEqual(
          {
            statusCode: 400,
            errorType: "validateSchema",
            message: "ID is non-Objectid"
          }
        );
    });
    
    
    test('should return 404 if brand not exist', async () => {
        const response = await agent.get('/api/v1/brands/123456789012345678901234');
  
        expect(response.status).toBe(404);
        expect(response.body).toEqual(
            {
              statusCode: 404,
              errorType: "HttpError",
              message: "Brand not found"
            }
        );
    });
  
    test('should return 200 if found', async () => {
  
      const brandName = faker.company.name() + faker.string.numeric(5);
      const brandSlug = buildSlug(brandName);
      const payload = {
        name:  brandName,
        slug: brandSlug,
        content: `Description for brand`,
        image: `https://picsum.photos/200/200`,
      };
  
      const res = await agent.post('/api/v1/brands').send(payload);
  
      const id = res.body.data._id;
  
      const response = await agent.get(`/api/v1/brands/${id}`);
  
      expect(response.status).toBe(200);
  
      expect(response.body.message).toBe('Success');
      expect(response.body.data._id).toBe(id);
      expect(response.body.data.name).toBe(brandName);
      expect(response.body.data.slug).toBe(brandSlug);
  
      expect(response.body.data.content).toEqual('Description for brand');
  
      expect(response.body.data).toHaveProperty('image');
    });
  
  });