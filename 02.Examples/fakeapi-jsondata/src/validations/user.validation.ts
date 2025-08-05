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
      email: yup.string().email('Email không hợp lệ').max(160).required(),
      active: yup.boolean().optional().default(true),
      password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Mật khẩu không hợp lệ').max(255, "Password tối đa 255 ký tự").required(),
      role: yup.string().oneOf(['staff', 'admin', 'superadmin', 'developer']).default('staff'),
      permissions: yup.array().of(yup.string()).min(0).required(),
    }),
  })
  .required();

const findById = yup
  .object({
     params: yup.object({
        id: yup.number().typeError('ID phải là số').required(),
    }),
  })
  .required();

const updateById = yup
  .object({
    params: yup.object({
        id: yup.number().typeError('ID phải là số').required(),
    }),
    body: yup.object({
        first_name: yup.string().min(2, "FirstName tối thiểu phải 2 kí tự").max(50).optional(),
        last_name: yup.string().min(2).max(50).optional(),
        email: yup.string().email('Email không hợp lệ').max(160).optional(),
        active: yup.boolean().optional(),
        password: yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/, 'Mật khẩu không hợp lệ').max(255, "Password tối đa 255 ký tự").optional(),
        role: yup.string().oneOf(['staff', 'admin', 'superadmin', 'developer']).optional(),
        permissions: yup.array().of(yup.string()).min(0).optional(),
    })
  })
  .required();

const updateUserRole = yup
  .object({
    params: yup.object({
      id: yup.number().typeError('ID phải là số').required(),
    }),
    body: yup.object({
      role: yup.string().oneOf(['staff', 'admin', 'superadmin', 'developer']).required(),
    }),
  })
  .required();

const assignPermissions = yup
  .object({
    params: yup.object({
      id: yup.number().typeError('ID phải là số').required(),
    }),
    body: yup.object({
      permissions: yup.array().of(yup.string()).min(0).required(),
    }),
  })
  .required();

const removePermissions = yup
  .object({
    params: yup.object({
      id: yup.number().typeError('ID phải là số').required(),
    }),
    body: yup.object({
      permissions: yup.array().of(yup.string()).min(0).required(),
    }),
  })
  .required();

const removePermission = yup
  .object({
    params: yup.object({
      id: yup.number().typeError('ID phải là số').required(),
    }),
    body: yup.object({
      permission: yup.string().required(),
    }),
  })
  .required();

const deleteById = yup
  .object({
    params: yup.object({
        id: yup.number().typeError('ID phải là số').required(),
    }),
  })
  .required();

export default {
  create,
  findById,
  updateById,
  deleteById,
  findAll,
  updateUserRole,
  assignPermissions,
  removePermissions,
  removePermission
};