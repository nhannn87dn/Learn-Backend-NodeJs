import { myDataSource } from "../databases/data-soucre";
import { TestTable } from "../databases/entities/test.entity";

const testRepository = myDataSource.getRepository(TestTable)

const getAll = async ()=>{
  return await testRepository.find()
}