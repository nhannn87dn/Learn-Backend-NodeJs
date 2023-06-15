const request = require('supertest');
const { faker } = require('@faker-js/faker');
const app = require('../../app');
const { connectDB, disconnectDB } = require('../../helpers/mongooseDB');
const configs = require('../../constants/configs');
const Brand = require('../../models/brand.model');
const buildSlug = require('../../helpers/buildSlug');
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

describe('PUT /api/v1/brands/:id', () => {
  
  test('should return 400 if invalid ID', async () => {
      const response = await agent.put('/api/v1/brands/123').send({});

      expect(response.status).toBe(400);
      expect(response.body).toEqual(
          {
            statusCode: 400,
            errorType: "validateSchema",
            message: "ID is non-Objectid, \"name\" is required, \"slug\" is required"
          }
      );
  });

  test('should return 404 if ID not found', async () => {

    let brandName = faker.company.name()+faker.string.numeric(5);
    let brandSlug = buildSlug(brandName);

    const brand = {
       name: brandName,
       slug: brandSlug,
      content: faker.lorem.paragraph(),
      image: 'https://picsum.photos/200/200',
    };

    const response = await agent.put('/api/v1/brands/647db7937640fa84b0580e57').send(brand);

    expect(response.status).toBe(404);
    expect(response.body).toEqual(
        {
          statusCode: 404,
          errorType: "HttpError",
          message: "Brand not found"
        }
    );
  });

  test('should return 200 if updated', async () => {

    let brandName = faker.company.name()+faker.string.numeric(5);
    let brandSlug = buildSlug(brandName);

    const brand = {
      name: brandName,
      slug: brandSlug,
      content: faker.lorem.paragraph(),
      image: 'https://picsum.photos/200/200',
    };

    brandName = faker.company.name()+faker.string.numeric(5);
    brandSlug = buildSlug(brandName);

    const newBrand = {
      name: brandName,
      slug: brandSlug,
      content: faker.lorem.paragraph(),
      image: 'https://picsum.photos/200/200',
    };

    const createResponse = await agent.post('/api/v1/brands').send(brand);
    const id = createResponse.body.data._id;

    const updateResponse = await agent.put(`/api/v1/brands/${id}`).send(newBrand);

    expect(updateResponse.status).toBe(200);

    expect(updateResponse.body.message).toBe('Success');
    expect(updateResponse.body.data.name).toBe(newBrand.name);
    expect(updateResponse.body.data.content).toBe(newBrand.content);
    expect(updateResponse.body.data.image).toBe(newBrand.image);

    })
})