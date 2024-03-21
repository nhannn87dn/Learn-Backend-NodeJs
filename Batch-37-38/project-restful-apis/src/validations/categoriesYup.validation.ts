import * as Yup from 'yup';


const getAll = {
    query: Yup.object({
      page: Yup.number().min(1).notRequired().integer().positive(),
      limit: Yup.number().min(5).max(50).notRequired().integer().positive(),
      sortBy: Yup.string().notRequired().oneOf(['price', 'sort']),
      sortType: Yup.string().notRequired().oneOf(['ASC', 'DESC']),
    }),
};

const getCategoryById = {
  params: Yup.object({
    //Khớp với định dạng objectId
    id: Yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'ID is non-Objectid'}).required(),
  }),
};

export default {
    getAll,
    getCategoryById
};