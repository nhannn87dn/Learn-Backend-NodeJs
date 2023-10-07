import { NextFunction, Request, Response } from 'express';
import { sendJsonSuccess } from '../helpers/responseHandler';
import categoriesService from '../services/categories.service';
/**
 * Controller == Điều khiển
 * - Tiếp nhận req từ client
 * - Phản hồi lại res cho client
 */

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await categoriesService.getAll();
    sendJsonSuccess(res)(categories); // Gọi hàm mà có truyền giá trị cho data
  } catch (error) {
    next(error);
  }
};

const getItemById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const user = await categoriesService.getItemById(parseInt(req.params.id))

    sendJsonSuccess(res)(user);
  } catch (error) {
    next(error);
  }
};

const createItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //thêm phần tử mới vào categories[]
    const payload = req.body;
    const newcategories = await categoriesService.createItem(payload);
    sendJsonSuccess(res)(newcategories);
  } catch (error) {
    next(error);
  }
};

const updateItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    console.log(id, req.body);
    const payload = req.body;
    //Bước 1: Tìm xem  có tồn tại user có id không
    const newcategories = await categoriesService.updateItem(parseInt(id), payload);
   
    sendJsonSuccess(res)(newcategories); // Gọi hàm mà có truyền giá trị cho data
    //res.json('ok');
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params; //id = 4

    const newcategories = await categoriesService.deleteItem(parseInt(id));
    
    sendJsonSuccess(res)(newcategories); // Gọi hàm mà có truyền giá trị cho data
  } catch (err) {
    next(err); //Chuyển tiếp lỗi ra cho handle error ở app.ts xử lý
  }
};

export default {
  getAll,
  getItemById,
  updateItem,
  createItem,
  deleteItem,
};
