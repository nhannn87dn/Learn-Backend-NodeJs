import { Brand } from "../entities/Brand.entity";
import { myDataSource } from "../data-soucre";

export const brandRepository = myDataSource.getRepository(Brand);