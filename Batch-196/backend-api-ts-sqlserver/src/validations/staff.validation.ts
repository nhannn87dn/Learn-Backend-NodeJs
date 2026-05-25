import * as yup from 'yup';

export const getAllStaffsSchema = yup
  .object({
    query: yup.object({
      page: yup.number().integer().min(1, 'Page must be at least 1').default(1).optional(),
      limit: yup.number().integer().positive('Limit must be a positive number').default(10).optional(),
      keyword: yup.string().optional(),
      role: yup.string().oneOf(['admin', 'staff'], 'Role must be admin or staff').optional(),
    }),
  })
  .required();

export const getStaffByIdSchema = yup
  .object({
    params: yup.object({
      id: yup.string().required('Staff ID is required'),
    }),
  })
  .required();

export const createStaffSchema = yup
  .object({
    body: yup.object({
      name: yup
        .string()
        .trim()
        .min(3, 'Name must be at least 3 characters long')
        .max(255, 'Name must be at most 255 characters long')
        .required('Name is required'),
      email: yup
        .string()
        .trim()
        .lowercase()
        .email('Email must be a valid email address')
        .required('Email is required'),
      password: yup
        .string()
        .trim()
        .min(6, 'Password must be at least 6 characters long')
        .max(255, 'Password must be at most 255 characters long')
        .required('Password is required'),
      is_active: yup.boolean().optional(),
      role: yup.string().oneOf(['admin', 'staff'], 'Role must be admin or staff').optional(),
    }),
  })
  .required();

export const updateStaffSchema = yup
  .object({
    params: yup.object({
      id: yup.string().required('Staff ID is required'),
    }),
    body: yup.object({
      name: yup
        .string()
        .trim()
        .min(3, 'Name must be at least 3 characters long')
        .max(255, 'Name must be at most 255 characters long')
        .optional(),
      email: yup
        .string()
        .trim()
        .lowercase()
        .email('Email must be a valid email address')
        .optional(),
      password: yup
        .string()
        .trim()
        .min(6, 'Password must be at least 6 characters long')
        .max(255, 'Password must be at most 255 characters long')
        .optional(),
      is_active: yup.boolean().optional(),
      role: yup.string().oneOf(['admin', 'staff'], 'Role must be admin or staff').optional(),
    }),
  })
  .required();

export const deleteStaffSchema = yup
  .object({
    params: yup.object({
      id: yup.string().required('Staff ID is required'),
    }),
  })
  .required();
