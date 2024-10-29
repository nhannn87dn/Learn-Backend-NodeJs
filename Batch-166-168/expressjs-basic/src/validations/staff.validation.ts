import * as yup from 'yup';

const create = yup
  .object({
    body: yup.object({
      first_name: yup.string().min(4, 'Tối thiểu 4 kí tự').max(50).required(),
      last_name: yup.string().min(4, 'Tối thiểu 4 kí tự').max(50).required(),
      email: yup.string().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email khong hop le').max(150).required(),
      phone: yup.string().matches(/0\d{9}$/, 'So DT khong hop le').required(),
      password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@!*%$#]).{8,}$/, 'Password khong hop le').max(500).required(),
    }),
  })
  .required();


export default {
    create,
}