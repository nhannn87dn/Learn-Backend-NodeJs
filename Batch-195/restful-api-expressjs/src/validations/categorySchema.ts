import * as yup from 'yup';

export const createCategorySchema = yup
  .object({
    body: yup.object({
      category_name: yup
        .string()
        .min(3, 'Category name must be at least 3 characters long')
        .max(50, 'Category name must be at most 50 characters long')
        .required('Category name is required'),
      description: yup.string().max(500, 'Description must be at most 500 characters long'),
      slug: yup.string().required('Slug is required').lowercase().trim(),
    }),
  })
  .required();


  export const updateCategorySchema = yup
  .object({
    params: yup.object({
        id: yup.string().required('Category ID is required'),
    }),
    body: yup.object({
      category_name: yup
        .string()
        .min(3, 'Category name must be at least 3 characters long')
        .max(50, 'Category name must be at most 50 characters long')
        .optional(),
        description: yup.string().max(500, 'Description must be at most 500 characters long')
        .optional(),
        slug: yup.string().lowercase().trim().optional(),
    }),
  })
  .required();