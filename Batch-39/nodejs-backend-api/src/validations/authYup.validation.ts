import * as yup from 'yup';


const loginSchema = yup
  .object({
    body: yup.object({
      email: yup.string().required(),
      password: yup.string().min(6).required(),
    }),
  })
  .required();


export default {
    loginSchema
}