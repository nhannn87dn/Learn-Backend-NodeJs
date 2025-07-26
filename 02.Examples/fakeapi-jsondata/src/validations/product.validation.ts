import * as yup from "yup";

const create = yup.object({
  body: yup.object({
    product_name: yup.string().min(2).max(100).required(),
    price: yup.number().min(0).required(),
    discount: yup.number().min(0).max(100).required(),
    category_id: yup.number().typeError('category_id phải là số').required(),
    brand_id: yup.number().typeError('brand_id phải là số').required(),
    description: yup.string().max(255).required(),
    model_year: yup.number().min(1900).max(new Date().getFullYear()).required(),
    stock: yup.number().min(0).required(),
    thumbnail: yup.string().url().required(),
    slug: yup.string().min(2).max(100).required(),
  })
}).required();

const findById = yup.object({
  params: yup.object({
    id: yup.number().typeError('ID phải là số').required(),
  })
}).required();

const updateById = yup.object({
  params: yup.object({
    id: yup.number().typeError('ID phải là số').required(),
  }),
  body: yup.object({
    product_name: yup.string().min(2).max(100).optional(),
    price: yup.number().min(0).optional(),
    discount: yup.number().min(0).max(100).optional(),
    category_id: yup.number().typeError('category_id phải là số').optional(),
    brand_id: yup.number().typeError('brand_id phải là số').optional(),
    description: yup.string().max(255).optional(),
    model_year: yup.number().min(1900).max(new Date().getFullYear()).optional(),
    stock: yup.number().min(0).optional(),
    thumbnail: yup.string().url().optional(),
    slug: yup.string().min(2).max(100).optional(),
  })
}).required();

const deleteById = yup.object({
  params: yup.object({
    id: yup.number().typeError('ID phải là số').required(),
  })
}).required();

export default {
  create,
  findById,
  updateById,
  deleteById
};
