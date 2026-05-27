import createError from "http-errors"
import { validateOrReject } from "class-validator"
import { myDataSource } from "../dataSource"
import { User } from "../entities/User.entity"

// Lấy repository của User từ data source
const userRepository = myDataSource.getRepository(User)

const findAll = async () => {
    //find() sẽ trả về một mảng các đối tượng User nếu tìm thấy, hoặc một mảng rỗng nếu không tìm thấy
  return await userRepository.find()
}

const getByIdOrFail = async (id: number) => {
    //findOne sẽ trả về một đối tượng User nếu tìm thấy, hoặc null nếu không tìm thấy
  const user = await userRepository.findOne({
    where: {
      id,
    },
  })

  if (!user) {
    throw createError(404, "User not found")
  }

  return user
}

const create = async (name: string, email: string, age: number) => {
    //create() sẽ tạo một instance mới của User nhưng chưa lưu vào cơ sở dữ liệu
  const user = userRepository.create({
    name,
    email,
    age,
  })

  try {
    await validateOrReject(user, { validationError: { target: false } })
  } catch (errors) {
    throw createError(400, "Validation failed", { details: errors })
  }
  //save() sẽ lưu instance của User vào cơ sở dữ liệu và trả về đối tượng User đã được lưu, bao gồm cả id được tự động sinh ra
  return await userRepository.save(user)
}

const updateById = async (id: number, name: string, email: string, age: number) => {
  const user = await getByIdOrFail(id)
  user.name = name
  user.email = email
  user.age = age

  try {
    await validateOrReject(user, { validationError: { target: false } })
  } catch (errors) {
    throw createError(400, "Validation failed", { details: errors })
  }

  //save() sẽ cập nhật instance của User trong cơ sở dữ liệu và trả về đối tượng User đã được cập nhật
  return await userRepository.save(user)
}

const deleteById = async (id: number) => {
    //getByIdOrFail sẽ trả về một đối tượng User nếu tìm thấy, hoặc ném lỗi 404 nếu không tìm thấy
  const user = await getByIdOrFail(id)
  //remove() sẽ xóa instance của User khỏi cơ sở dữ liệu và trả về đối tượng User đã bị xóa
  return await userRepository.remove(user)
}

export default {
  findAll,
  getByIdOrFail,
  create,
  updateById,
  deleteById,
}
