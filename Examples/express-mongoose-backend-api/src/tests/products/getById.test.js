const request = require('supertest');
/* https://next.fakerjs.dev/ */
const { faker } = require('@faker-js/faker');
const buildSlug = require('../../helpers/buildSlug');
const generateRandomMobile = require("../../helpers/randomVnMobileHelper")
const fileHandlerHelper = require('../../helpers/fileHandlerHelper');

const app = require('../../app');
const { connectDB, disconnectDB } = require('../../helpers/mongooseDB');
const configs = require('../../constants/configs');

/* Sử dụng agent để bắt request dùng port của server */
const agent = request.agent(app);
let server;

//sử dụng startServer và stopServer để khởi động và dừng server trước và sau khi tất cả các tests chạy
beforeAll(async () => {
  await connectDB()
  .then(() => {
    // Đảm bảo rằng kết nối MongoDB đã thành công trước khi lắng nghe ứng dụng
     server =  app.listen(configs.PORT, () => {
      console.log(`Server started on port ${configs.PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });
});

/** Sau khi test xong thì tắt */
afterAll(async () => {
  await disconnectDB();
  await server.close();
});


describe('GET /api/v1/products/:slug', () => {
  
    test('should return 400 if invalid slug', async () => {
        const response = await agent.get('/api/v1/products/Health1');
    
        //So sánh status với kết quả đúng
        expect(response.status).toBe(400);
        //So sánh với kết quả đúng
        expect(response.body).toEqual(
            {
              statusCode: 400,
              errorType: "validateSchema",
              message: "Slug contain only letters, numbers, and hyphens"
            }
        );
    });
  
    test('should return 404 if slug not exist', async () => {
        const response = await agent.get('/api/v1/products/health-one');
  
        //So sánh status với kết quả đúng
        expect(response.status).toBe(404);
        //So sánh với kết quả đúng
        expect(response.body).toEqual(
            {
              statusCode: 404,
              errorType: "HttpError",
              message: "Product not found"
            }
        );
    });
  
    test('should return 200 if found', async () => {

        // Tạo danh mục mới
        const categoryName = faker.commerce.department()+faker.string.numeric(5);
        const cateSlug = buildSlug(categoryName);
        const payload = {
          name:  categoryName,
          slug: cateSlug,
          content: `Description for category`,
          image: `https://picsum.photos/200/200`,
        };
    
        const res = await agent.post('/api/v1/categories').send(payload);
        const categoryId = res.body.data._id;


        // Tạo brand mới mới
          // Tạo thương hiệu mới và lấy id của thương hiệu đó
          const brandName = faker.company.name()+faker.string.numeric(5);
          const brandSlug = buildSlug(brandName);
          const payload_brand = {
            name:  brandName,
            slug: brandSlug,
            content: `Description for brand`,
            image: `https://picsum.photos/200/200`,
          };
      
          const responseBrand = await agent.post('/api/v1/brands').send(payload_brand);
          const brandId = responseBrand.body.data._id;

        // Tạo customer mới mới
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
    
        const resCustomer = await agent.post('/api/v1/customers').send(userData);
        const customerId = resCustomer.body.data._id;


        //Payload cho product
        const reviews = [];
        const productImages = [];
        for (let j = 1; j <= 3; j++) {
          const review = {
            customerId: customerId,
            rating: Math.floor(Math.random() * 5) + 1,
            comment: `This is review ${j} for product.`,
          };
    
          const productImage = {
            url: `https://picsum.photos/400/400`,
            alt: '',
            caption: '',
            position: j
          };
    
          reviews.push(review);
          productImages.push(productImage);
        }
    
        
        let productName = faker.commerce.productName();
    
        const productPayload = {
          name: productName,
          slug: buildSlug(productName),
          brandId: brandId,
          category: categoryId,
          price: 100 + Math.floor(Math.random() * 5) * 5,
          description: faker.commerce.productDescription(),
          rating: 4.5,
          stock: 5,
          discount: 15,
          reviews: reviews,
          thumbnail: `https://picsum.photos/200/200`,
          images: productImages,
        };
        //post Product
        const resProduct = await agent.post('/api/v1/products').send(productPayload);

        fileHandlerHelper.write('./src/logs/products.json', resProduct);

        //expect Product
        expect(resProduct.statusCode).toEqual(200);
        expect(resProduct.body.data.name).toBe(productPayload.name);
        expect(resProduct.body.data.slug).toBe(productPayload.slug);
        expect(resProduct.body.data.brandId).toBe(productPayload.brandId);
        expect(resProduct.body.data.category).toBe(productPayload.category);
        expect(resProduct.body.data.price).toBe(productPayload.price);
        //Thêm so sánh khác cho kỹ hơn
    });
  
});