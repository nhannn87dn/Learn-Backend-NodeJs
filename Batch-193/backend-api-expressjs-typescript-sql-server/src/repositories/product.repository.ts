import { Product } from "../entities/Product.entity";
import { myDataSource } from "../data-soucre";

export const productRepository = myDataSource.getRepository(Product);