import * as yup from 'yup';

const findOne = yup
  .object({
    params: yup.object({
      id: yup.string().matches(/^[0-9a-fA-F]{24}$/, 'ID category invalid').required(),
    }),
  })
  .required();

const create = yup
  .object({
    body: yup.object({
      category_name: yup.string().min(4, 'Tối thiểu 4 kí tự').required(),
    }),
  })
  .required();


export default {
    create,
    findOne
}