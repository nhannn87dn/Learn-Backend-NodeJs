import * as dotenv from "dotenv";
import * as yup from "yup";

// Load biến môi trường từ file .env
dotenv.config();

// Khai báo schema Yup cho tất cả biến
const envSchema = yup.object({
  PORT: yup
    .number()
    .required("PORT is required")
    .integer()
    .positive()
    .default(9000),

  NODE_ENV: yup
    .string()
    .oneOf(["development", "production", "test"])
    .required("NODE_ENV is required")
    .default("development"),

  MONGODB_CONNECTION_STRING: yup
    .string()
    .required("MONGODB_CONNECTION_STRING is required"),
  /// add more env here

  JWT_SECRET_KEY: yup
    .string()
    .optional().default("your_jwt_secret_key"),

  JWT_ACCESS_TOKEN_EXPIRES_IN: yup
    .string()
    .optional().default("7d"),

  JWT_REFRESH_TOKEN_EXPIRES_IN: yup
    .string()
    .optional().default("30d"),

});

// Validate process.env
let validatedEnv: yup.InferType<typeof envSchema>;
try {
    validatedEnv = envSchema.validateSync(process.env, {
      abortEarly: false, // gom tất cả lỗi lại
      stripUnknown: true, // loại bỏ các biến không có trong schema
    });
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      console.error("\n❌ Invalid environment configuration:");
      for (const message of err.errors) {
        console.error(`  - ${message}`);
      }
      console.error("\n💡 Please check your .env file.\n");
      process.exit(1); // Dừng app ngay
    } else {
      throw err;
    }
  }

export const ENV = validatedEnv;
