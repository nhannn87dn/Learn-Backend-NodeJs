import Yup from 'yup';
import customerValidator from './custom.validation'


const getAll = {
    query: Yup.object({
      page: Yup.number().min(1).notRequired().integer().positive(),
      limit: Yup.number().min(5).max(50).notRequired().integer().positive(),
      sortBy: Yup.string().notRequired().oneOf(['price', 'sort']),
      sortType: Yup.string().notRequired().oneOf(['ASC', 'DESC']),
    }),
};

const getProductById = {
  params: Yup.object({
    id: Yup.string().required(),
  }),
};

export default {
    getAll,
    getProductById
};