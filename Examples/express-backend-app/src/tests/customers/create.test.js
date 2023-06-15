const request = require('supertest');
const { faker } = require('@faker-js/faker');
const app = require('../../app');
const { connectDB, disconnectDB } = require('../../helpers/mongooseDB');
const configs = require('../../constants/configs');
const fileHandlerHelper = require('../../helpers/fileHandlerHelper');

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


function generateRandomMobile() {
  const prefixArray = ['032', '033', '034', '035', '036', '037', '038', '039', '058', '059', '070', '076', '077', '078', '079', '081', '082', '083', '084', '085', '086', '088', '089', '090', '091', '092', '093', '094', '096', '097', '098', '099'];
  const randomPrefix = prefixArray[Math.floor(Math.random() * prefixArray.length)];
  const randomNumber = Math.floor(Math.random() * 10000000);
  const mobileString = `${randomPrefix}${String(randomNumber).padStart(7, '0')}`;
  return mobileString;
}

describe('POST /api/v1/customers', () => {
  //bỏ trống payload

  //Thiếu một trong các trường require true
 
  
 //Điền đầy đủ, và đúng
  test('should return customer width status 200 if create successfully', async () => {

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const phoneNumber = generateRandomMobile();
    const address = faker.location.streetAddress();
    const email = faker.internet.email();

    // Tạo sản phẩm mới và lấy id của sản phẩm đó
    const userData = {
       firstName,
      lastName,
      phoneNumber,
      address,
      email
    };

    const res = await agent.post('/api/v1/customers').send(userData);
   // fileHandlerHelper.write('./src/logs/customer.json', res.body);
  
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.firstName).toBe(userData.firstName);
    expect(res.body.data.email).toBe(userData.email);
    expect(res.body.data.lastName).toBe(userData.lastName);
    expect(res.body.data.phoneNumber).toBe(userData.phoneNumber);
    expect(res.body.data.address).toBe(userData.address);

  });

});