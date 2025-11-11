import { ObjectId } from 'mongoose';
import * as yup from 'yup';

const ObjectIdRegex = /^[0-9a-fA-F]{24}$/;

/* get category By Id */
const getByIdSchema = yup
  .object({
    params: yup.object({
      //id: yup.string().required().length(24)
      id: yup.string().required().matches(ObjectIdRegex, 'Invalid ID format')
    })
  })
  .required();

/** create new Category */
const createSchema = yup
  .object({
    body: yup.object({
      category_name: yup.string().required().min(2).max(60),
      slug: yup.string().required().min(2).max(255),
      description: yup.string().optional().default(''),
    }),
    // params: yup.object({}),
    // query: yup.object({}),
  })
  .required();

//update category
const updateSchema = yup
  .object({
    params: yup.object({
      id: yup.string().required().matches(ObjectIdRegex, 'Invalid ID format')
    }),
    body: yup.object({
        //Note: Tuỳ theo logic cập nhật từng trường hay là tất cả
        //để quyết định dùng required hay là optional
      category_name: yup.string().optional().min(2).max(60),
      slug: yup.string().optional().min(2).max(255),
      description: yup.string().optional().default(''),
    }),
  })
  .required();

//delete category
const deleteSchema = yup
  .object({
    params: yup.object({
      id: yup.string().required().matches(ObjectIdRegex, 'Invalid ID format')
    })
  })
  .required();

export default {
    getByIdSchema,
    createSchema,
    updateSchema,
    deleteSchema
}