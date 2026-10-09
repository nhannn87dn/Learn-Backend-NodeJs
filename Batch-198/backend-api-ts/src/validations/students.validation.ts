import { z } from 'zod';

const getStudentById = z.object({
    //validate params
 params: z.object({
    //ép buộc id phải là số nguyên dương
  id: z.coerce.number().int().positive(),
 }),
});

// Quy tắc dữ liệu cho việc tạo mới student

const createStudent = z.object({
    body: z.object({
        name: z.string().min(1, { message: "Name is required" }),
        age: z.number().int().positive({ message: "Age must be a positive integer" }),
        email: z.string().email({ message: "Invalid email address" }),
    }),
});

export default {
 getStudentById,
 createStudent
};