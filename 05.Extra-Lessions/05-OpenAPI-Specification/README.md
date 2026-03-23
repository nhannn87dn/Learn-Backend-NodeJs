# Tích ợp OpenAPI Specification (Swagger) vào Express

## 🚀 1. Cài Swagger cho Express

Dùng 2 package phổ biến:

* swagger-jsdoc
* swagger-ui-express

```bash
npm install swagger-jsdoc swagger-ui-express
```

---

## 📁 2. Tạo file config Swagger

Tạo file:
`src/configs/swagger.ts`

```ts
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import SETTINGS from "../constants/SETTINGS";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Express API with Swagger & Mongoose",
      version: "1.0.0",
      description: "REST API docs for Express + Mongoose project",
    },
    servers: [
      {
        url: `http://localhost:${SETTINGS.PORT}/api/v1`,
      },
    ],
  },
  apis: ["./src/routes/v1/*.ts", "./src/models/*.ts"], // nơi swagger-jsdoc scan
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

```

---

## 🧩 3. Mount Swagger UI vào app

Trong file `app.ts` hoặc `server.ts`:

```ts
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './configs/swagger';

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```

👉 Truy cập:

```
http://localhost:8080/api-docs
```

---

## ✍️ 4. Viết Swagger ngay trong route (QUAN TRỌNG)

Bạn sẽ viết comment theo chuẩn OpenAPI ngay trong file route.

Dựa vào file của bạn:



---

### Ví dụ: GET all categories

```ts
/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', authenticateToken, categoriesController.getAllCategories);
```

---

### Ví dụ: GET category by ID

```ts
/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not found
 */
router.get('/:id', authenticateToken, categoriesController.getCategoryById);
```

---

### Ví dụ: POST create category

```ts
/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_name:
 *                 type: string
 *               description:
 *                 type: string
 *               slug:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', authenticateToken, validateSchemaYup(createCategorySchema), categoriesController.createCategory);
```

---

## 🔐 5. Thêm Bearer Auth (rất nên có)

Update `swagger.ts`:

```ts
components: {
  securitySchemes: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    },
  },
},
```

---

## 📦 6. Tách schema ra riêng (best practice)

Tạo folder:

```
/docs/schemas/category.schema.ts
```

```ts
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         category_name:
 *           type: string
 *         description:
 *           type: string
 *         slug:
 *           type: string
 */
```

👉 Sau đó dùng lại:

```ts
schema:
  $ref: '#/components/schemas/Category'
```

---

## 🧠 7. Mapping với code của bạn

### Controller của bạn



👉 Bạn đang dùng:

```ts
sendJsonSuccess({
  res,
  status: SUCCESS.OK,
  data: data,
});
```

👉 Swagger nên phản ánh đúng response:

```yaml
responses:
  200:
    description: Success
    content:
      application/json:
        schema:
          type: object
          properties:
            success:
              type: boolean
            data:
              type: array
              items:
                $ref: '#/components/schemas/Category'
```

