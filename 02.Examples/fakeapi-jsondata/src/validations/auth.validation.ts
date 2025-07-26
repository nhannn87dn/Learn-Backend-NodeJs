import * as yup from 'yup';

export const loginValidationSchema = yup.object({
    body: yup.object({
        email: yup.string().email('Email không hợp lệ').required('Email là bắt buộc'),
        password: yup.string().required('Mật khẩu là bắt buộc'),
    })
}).required();
