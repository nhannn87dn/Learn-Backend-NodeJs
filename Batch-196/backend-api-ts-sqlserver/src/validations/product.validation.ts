
import * as yup from 'yup';

//Get All products validation schema
export const getAllProductsSchema = yup
  .object({
    query: yup.object({
        page: yup.number().integer().min(1, 'Page must be at least 1').default(1).optional(),
        limit: yup.number().integer().positive().default(10).optional(),
        category: yup.string().optional(),
        brand: yup.string().optional(),
        keyword: yup.string().optional(),
    }),
  })
  .required();

//Get product by id validation schema
export const getProductByIdSchema = yup
  .object({
    params: yup.object({
      id: yup.string().required('Product ID is required'),
    }),
  })
  .required();


//create product validation schema
export const createProductSchema = yup
  .object({
    body: yup.object({
      product_name: yup
        .string()
        .min(3, 'Product name must be at least 3 characters long')
        .max(255, 'Product name must be at most 255 characters long')
        .required('Product name is required'),
      price: yup
        .number()
        .min(0, 'Price must be at least 0')
        .required('Price is required'),
      discount: yup
        .number()
        .min(0, 'Discount must be a non-negative number')
        .max(70, 'Discount must be a number between 0 and 70')
        .required('Discount is required'),
      category: yup
        .string()
        .required('Category is required'),
      brand: yup
        .string()
        .required('Brand is required'),
      description: yup.string().max(500, 'Description must be at most 500 characters long').optional(),
      model_year: yup
        .number()
        .integer('Model year must be an integer')
        .positive('Model year must be a positive number')
        .optional(),
      slug: yup
        .string()
        .min(3, 'Slug must be at least 3 characters long')
        .max(255, 'Slug must be at most 255 characters long')
        .required('Slug is required')
        .lowercase()
        .trim(),
      thumbnail: yup.string().url('Thumbnail must be a valid URL')
      .max(255, 'Thumbnail must be at most 255 characters long')
      .optional(),
      stock: yup
        .number()
        .integer('Stock must be an integer')
        .min(0, 'Stock must be at least 0')
        .required('Stock is required'),
    }),
  })
  .required();

//update product validation schema
export const updateProductSchema = yup
  .object({
    params: yup.object({
      id: yup.string().required('Product ID is required'),
    }),
    body: yup.object({
      product_name: yup
        .string()
        .min(3, 'Product name must be at least 3 characters long')
        .max(255, 'Product name must be at most 255 characters long')
        .optional(),
      price: yup
        .number()
        .min(0, 'Price must be at least 0')
        .optional(),
        discount: yup
        .number()
        .min(0, 'Discount must be a non-negative number')
        .max(70, 'Discount must be a number between 0 and 70')
        .optional(),
      category: yup
        .string()
        .optional(),
      brand: yup
        .string()
        .optional(),
      description: yup.string().max(500, 'Description must be at most 500 characters long').optional(),
      model_year: yup
        .number()
        .integer('Model year must be an integer')
        .positive('Model year must be a positive number')
        .optional(),
      slug: yup
        .string()
        .min(3, 'Slug must be at least 3 characters long')
        .max(255, 'Slug must be at most 255 characters long')
        .lowercase()
        .trim()
        .optional(),
      thumbnail: yup.string().url('Thumbnail must be a valid URL')
        .max(255, 'Thumbnail must be at most 255 characters long')
        .optional(),
      stock: yup
        .number()
        .integer('Stock must be an integer')
        .min(0, 'Stock must be at least 0')
        .optional(),
    }),
  })
  .required();

  //delete product validation schema
export const deleteProductSchema = yup
  .object({
    params: yup.object({
      id: yup.string().required('Product ID is required'),
    }),
  })
  .required();