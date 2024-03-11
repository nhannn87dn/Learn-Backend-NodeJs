# Folder Structure Express and Node.Js

Tiếp tục maintenance project theo Follow

>* Tạo Routes theo phiên bản
>* Tạo Controllers
>* Tạo Services
>* Handle Errors inside routes, controllers, services
>


## 💛 Tạo RESTFul-APIs theo phiên bản

Trong thực tế mỗi khi API đã được phát hành và chạy trên môi trường production thực tế. Bạn không thể đi sửa code các API trừ trường hợp bất khả kháng và phải có kế hoạch thông báo đến người dùng.

Tạo ra các phiên bản mới hơn như là để nâng cấp code cho phiên bản cũ.

- Trong thư mục src/routes tạo thêm một thư mục v1

- Maintenance các routes demo phần trước, đưa vào v1

- Resources Categories

| HTTP Method | Endpoint              | Description                     |
|-------------|-----------------------|---------------------------------|
| GET         | api/v1/categories          | Retrieve all categories               |
| GET         | api/v1/categories/:id      | Retrieve a specific category         |
| POST        | api/v1/categories/:id      | Create a new category                |
| PUT         | api/v1/categories/:id      | Update a specific category           |
| DELETE      | api/v1/categories/:id      | Delete a specific category           |


Tại src/routes/v1 tạo file category.route.ts

```js
import express from 'express';
import createError from 'http-errors';
const router = express.Router();

/* tách thành file json */
const categories = [
  { id: 1, name: 'Road' },
  { id: 2, name: 'Mountain'},
  { id: 3, name: 'Hybrid'},
];

// Get all categories
// localhost:8686/api/v1/categories
router.get('/categories', async (req: Request, res: Response) => {
  res.status(200).json(categories);
});

// Create a new category
// localhost:8686/api/v1/categories
router.post('/categories', async (req: Request, res: Response) => {
  //Thêm một phần tử vào mảng
  const newCategories = {...categories,{id: 4: name: 'Cruiser'}}

  //trả lại mảng mới
  res.status(200).json(categories);
});

// Get a category by ID
// localhost:8686/api/v1/categories/1
router.get('/categories/:id', async (req: Request, res: Response,next) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw createError(400, 'Missing category ID');
    }

    const category = categories.find((category) => category.id === id);

    if (!category) {
      throw createError(404, 'Category not found');
    }

    res.status(200).json(category);
  } catch (err) {
    next(err);
  }

});

// Update a category
// localhost:8686/api/v1/categories/1
router.patch('/categories/:id', async (req: Request,  res: Response, next: NextFunction) => {
  // ...
});

// Delete a category
// localhost:8686/api/v1/categories/1
router.delete('/categories/:id', async (req: Request,  res: Response, next: NextFunction) => {
  // ...
});

export default  router;
```

Gắn router vào app.ts

```js
import categoriesRoute from './routes/v1/categories.route';

//Response version API
app.get('/', async (req: Request, res: Response) => {
  res.status(200).json({ message: 'Hello World !' });
});

//Response version API
app.get('/api', async (req: Request, res: Response) => {
  res.status(200).json({ version: 'API 1.0' });
});

//Các API sẽ bắt đầu bằng api
app.use('/api/v1', categoriesRoute);
```

## 💛 TEST API

- REST Client (Huachao Mao) Extension
- PostMan: <https://www.postman.com/downloads/>

## 💛 Tạo Controller

Tiếp tục refactor các routes, chuyển thành các controllers

Tách xử lý business logic ra khỏi routes, giúp routes gọn hơn, dễ nhìn hơn, dễ bão trì hơn

Tạo file src/controllers/categories.controller.ts

```js
import createError from 'http-errors';
const categories = [
  { id: 1, name: 'Road' },
  { id: 2, name: 'Mountain'},
  { id: 3, name: 'Hybrid'},
];

// Get all categories
const getAllCategories = async (req: Request, res: Response) => {
  res.status(200).json(categories);
};

// Get a category by ID
const getCategoryById = async (req: Request,  res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw createError(400, 'Missing category ID');
    }

    const category = await categories.find((category) => category.id === id);

    if (!category) {
      throw createError(404, 'Category not found');
    }

    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

// Create a new category
const createCategory = async (req: Request, res: Response) => {
  console.log('createCategory');
};

// Update a category by ID
const updateCategoryById = async (req: Request, res: Response) => {
  console.log('updateCategoryById');
};

// Delete a category by ID
const deleteCategoryById = async (req: Request, res: Response) => {
  console.log('deleteCategoryById');
};

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById
}
```

refactor lại phần categories Route src/routes/v1/categories.route.ts

```js
import express  from "express";
const router = express.Router();
import categoriesController from '../../controllers/categories.controller';

router.get('/', categoriesController.getAllCategories);

router.get('/:id', categoriesController.getCategoryById);

router.post('/', categoriesController.createCategory);

router.put('/:id', categoriesController.updateCategoryById);

router.delete('/:id', categoriesController.deleteCategoryById);

export default  router;
```

Sử dòng này ở app.ts

```js
//app.use('/api/v1', categoriesRoute);
app.use('/api/v1/categories', categoriesRoute);
```

## 💛 Tạo Service

Nếu bạn muốn tách phần xử lý business logic fetch Data ra khỏi controller
thì tạo thêm lớp Service. Controller chỉ nhận data và trả lại response

Tạo file src/services/categories.service.ts

Lưu ý: nó trả về Data cho Controller nên sử dụng return

```js
import createError from 'http-errors';
const categories = [
  { id: 1, name: 'Road' },
  { id: 2, name: 'Mountain'},
  { id: 3, name: 'Hybrid'},
];

// Get all categories
const getAllCategories = async (categories) => {
  return categories;
};

// Get a category by ID
const getCategoryById = async (req) => {
  try {
    const { id } = req.params;

    if (!id) {
      throw createError(400, 'Missing category ID');
    }

    const category = await categories.find((category) => category.id === id);

    if (!category) {
      throw createError(404, 'Category not found');
    }

    return category;
  } catch (err) {
    next(err);
  }
};

// Create a new category
const createCategory = async () => {
  console.log('createCategory');
  return categories;
};

// Update a category by ID
const updateCategoryById = async () => {
  console.log('updateCategoryById');
  return categories;
};

// Delete a category by ID
const deleteCategoryById = async () => {
  console.log('deleteCategoryById');
  return categories;
};

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById
}
```

Khi đó category Controller bạn refactor lại như sau:

chuyển hết phần hander error sang service

```js
import createError from 'http-errors';
import categoriesService from '../services/categories.service';

const getAllCategories = async (req: Request,  res: Response, next: NextFunction) => {
  try {
    const categories = await categoriesService.getAllCategories();
    res.status(200).send(categories);
  } catch (err) {
    next(err);
  }
};

const getCategoryById = async (req: Request,  res: Response, next: NextFunction) => {
  try {
    const category = await categoriesService.getCategoryById(req);
    res.send(category);
  } catch (err) {
    next(err);
  }
};

// Create a new category
const createCategory = async (req: Request,  res: Response, next: NextFunction) => {
  console.log('createCategory');
};

// Update a category by ID
const updateCategoryById = async (req: Request,  res: Response, next: NextFunction) => {
  console.log('updateCategoryById');
};

// Delete a category by ID
const deleteCategoryById = async (req: Request,  res: Response, next: NextFunction) => {
  console.log('deleteCategoryById');
};
export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategoryById,
  deleteCategoryById
}
```
Còn không bạn có thể dừng lại ở mức cơ bản là controller, fetch Data và trả
lại response.

