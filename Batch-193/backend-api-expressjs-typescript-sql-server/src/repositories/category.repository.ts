import { Category } from "../entities/Category.entity";
import { myDataSource } from "../data-soucre";

export const categoryRepository = myDataSource.getRepository(Category);