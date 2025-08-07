import * as yup from "yup";

const findAll = yup
  .object({
    query: yup.object({
      page: yup.number().min(1).default(1),
      limit: yup.number().min(1).max(100).default(5),
      sort: yup.string().oneOf(['asc', 'desc']).default('desc'),
      keyword: yup.string().optional().default(null),
      active: yup.boolean().optional().default(null),
    }),
  })
  .required();

const create = yup
  .object({
    body: yup.object({
      first_name: yup.string().min(2, "FirstName tối thiểu phải 2 kí tự").max(50).required(),
      last_name: yup.string().min(2).max(50).required(),
      email: yup.string().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email không hợp lệ').max(160).required(),
      active: yup.boolean().optional().default(true),
      password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Mật khẩu không hợp lệ').max(255, "Password Tối đã 2555 ký tự").required(),
      roles: yup.array().of(yup.string().oneOf(['staff', 'admin', 'superadmin'])).default(['staff']),
    }),
  })
  .required();

const findById = yup
  .object({
     params: yup.object({
        id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'ID is non-Objectid'}).required(),
    }),
  })
  .required();

const updateById = yup
  .object({
    params: yup.object({
        id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'ID is non-Objectid'}).required(),
    }),
    body: yup.object({
        first_name: yup.string().min(2, "FirstName tối thiểu phải 2 kí tự").max(50).optional(),
        last_name: yup.string().min(2).max(50).optional(),
        email: yup.string().matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Email không hợp lệ').max(160).optional(),
        active: yup.boolean().optional(),
        password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Mật khẩu không hợp lệ').max(255, "Password Tối đã 2555 ký tự").optional(),
        roles: yup.array().of(yup.string().oneOf(['staff', 'admin', 'superadmin'])).optional(),
    })
  })
  .required();



const deleteById = yup
  .object({
    params: yup.object({
        id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'ID is non-Objectid'}).required(),
    }),
  })
  .required();

const addRole = yup
  .object({
    params: yup.object({
        id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'ID is non-Objectid'}).required(),
    }),
    body: yup.object({
        role: yup.string().oneOf(['staff', 'admin', 'superadmin']).required(),
    }),
  })
  .required();

const removeRole = yup
  .object({
    params: yup.object({
        id: yup.string().matches(/^[0-9a-fA-F]{24}$/, {message: 'ID is non-Objectid'}).required(),
    }),
    body: yup.object({
        role: yup.string().oneOf(['staff', 'admin', 'superadmin']).required(),
    }),
  })
  .required();

export default {
  create,
  findById,
  updateById,
  deleteById, 
  findAll,
  addRole,
  removeRole
};