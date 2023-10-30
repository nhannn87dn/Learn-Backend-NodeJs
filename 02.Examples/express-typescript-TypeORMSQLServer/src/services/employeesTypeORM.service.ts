import { AppDataSource } from "../../data-source";
import { Employee } from "../entities/employee.entity";
import createError from 'http-errors'

const repository = AppDataSource.getRepository(Employee);

/**
 * Các hàm trong service phải có return
 */

const getAllItems = async (page: number, limit: number) => {
    //Vừa lấy vừa đếm được tổng số record có trong table
    const [employees, totalCount] = await repository.findAndCount({
        order: {
            id: "DESC",
        },
        skip: (page - 1) * limit,
        take: limit,
    });
    
    return {
        employees,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        recordsPerPage: limit
    };
};


const getItemById = async (id: string) => {
    const result = await repository.findOneBy({
        id: parseInt(id),
    });
    return result;
};

const createItem = async (payload: any) => {
    const employee = await repository.create(payload);
    const result = await repository.save(employee);
    return result;
};

const updateItem = async (id: string, payload: any) => {
    const employee = await getItemById(id);
    
    if (!employee) {
      throw createError(404, "Employee not found");
    }
    //repository.merge(employee, payload);
    Object.assign(employee, payload);

    const result = await repository.save(employee)
    return result;
};

const deleteItem = async (id: string) => {
    const employee = await getItemById(id);
    
    if (!employee) {
      throw createError(404, "Employee not found");
    }

    const result = await repository.delete({
        id: employee.id
    })
    return result;
};

export default {
  getAllItems,
  getItemById,
  updateItem,
  createItem,
  deleteItem,
};