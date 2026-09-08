import { z } from "zod";

const getAllProducts = z.object({
  query: z.object({
    page: z.coerce.number().int().positive().default(1),
    limit: z.coerce.number().int().positive().default(10),
    search: z.string().trim().optional(),
    category: z.string().trim().optional(),
    brand: z.string().trim().optional(),
    sortBy: z.string().trim().optional(),
    sortType: z.enum(["asc", "desc"]).optional(),
  }),
});

const getProductById = z.object({
  params: z.object({
    //id match objectId pattern
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid product ID format"),
  }),
});

const createProduct = z.object({
  body: z.object({
    product_name: z
      .string()
      .trim()
      .min(3, "Product name is required")
      .max(255, "Product name must be at most 255 characters"),
    description: z
      .string()
      .trim()
      .max(255, "Description must be at most 1000 characters")
      .optional(),
    price: z.number().min(0, "Price tối thiểu là 0").default(0).optional(),
    discount: z.number().min(0, "Price tối thiểu là 0").default(0).optional(),
    model_year: z
      .number()
      .int()
      .min(1900, "Model year must be at least 1900")
      .max(
        new Date().getFullYear(),
        `Model year cannot be greater than ${new Date().getFullYear()}`,
      ),
    category: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID format"),
    brand: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid brand ID format"),
    stock: z.number().min(0, "Stock tối thiểu là 0").default(0).optional(),
    slug: z
      .string()
      .trim()
      .min(3, "Slug is required")
      .max(255, "Slug must be at most 255 characters"),
    thumbnail: z
      .string()
      .trim()
      .max(255, "Thumbnail must be at most 255 characters")
      .default("")
      .optional(),
  }),
});

const updateProduct = z.object({
  body: z.object({
    product_name: z
      .string()
      .trim()
      .min(3, "Product name is required")
      .max(255, "Product name must be at most 255 characters")
      .optional(),
    description: z
      .string()
      .trim()
      .max(255, "Description must be at most 1000 characters")
      .optional(),
    price: z.number().min(0, "Price tối thiểu là 0").default(0).optional(),
    discount: z.number().min(0, "Price tối thiểu là 0").default(0).optional(),
    model_year: z
      .number()
      .int()
      .min(1900, "Model year must be at least 1900")
      .max(
        new Date().getFullYear(),
        `Model year cannot be greater than ${new Date().getFullYear()}`,
      )
      .optional(),
    category: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID format")
      .optional(),
    brand: z
      .string()
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid brand ID format")
      .optional(),
    stock: z.number().min(0, "Stock tối thiểu là 0").default(0).optional(),
    slug: z
      .string()
      .trim()
      .min(3, "Slug is required")
      .max(255, "Slug must be at most 255 characters")
      .optional(),
    thumbnail: z
      .string()
      .trim()
      .max(255, "Thumbnail must be at most 255 characters")
      .default("")
      .optional(),
  }),
});

const deleteProductById = z.object({
  params: z.object({
    //id match objectId pattern
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid product ID format"),
  }),
});

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProductById,
};
