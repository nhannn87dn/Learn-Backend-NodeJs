import * as yup from "yup";

const create = yup.object({
  body: yup.object({
    category_name: yup.string().min(2).max(100).required(),
    description: yup.string().max(255).required(),
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
    category_name: yup.string().min(2).max(100).optional(),
    description: yup.string().max(255).optional(),
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
