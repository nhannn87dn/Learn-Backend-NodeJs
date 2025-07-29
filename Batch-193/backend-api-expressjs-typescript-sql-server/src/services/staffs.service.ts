import createError from "http-errors";


const findAll = async (query: any) => {
  // You can implement filtering, sorting, and pagination based on the query parameters
  // For example, if you want to filter by active status:
  const { page = 1, limit = 5, sort = 'desc', keyword = null, active = null } = query;
  
  return []
};

const findById = async (id: string) => {
  
  return [];
};

const create = (payload: any) => {

  
  return [];
};

const updateById = async (id: string, payload: any) => {
 
  return [];
};

const deleteById = async (id: string) => {
  
  return [];
};

export default {
  findAll,
  findById,
  create,
  deleteById,
  updateById,
};
