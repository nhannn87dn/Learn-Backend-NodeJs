import dotenv from "dotenv";
import * as yup from "yup";

// Load .env file
dotenv.config();

// Environment Variables Schema
const EnvSchema = yup.object().shape({
  PORT: yup.number().default(3000),
  NODE_ENV: yup.string().oneOf(["development", "production", "test"]).default("development"),
  MONGODB_URI: yup.string().required(),
  JWT_SECRET: yup.string().required(),
  DB_NAME: yup.string().required(),
  DB_USER: yup.string().required(),
  DB_PASSWORD: yup.string().required(),
  DB_HOST: yup.string().required(),
  DB_PORT: yup.number().default(1433),
  DB_TYPE: yup.string().default("mssql"),
  DB_SYNCHRONIZE: yup.boolean().required(),
  DB_LOGGING: yup.boolean().required(),
  DB_ENCRYPT: yup.boolean().required(),
});

// Environment Configuration Helper
export function loadEnvConfig() {
  try {
    // Validate environment variables
    const parsedEnv = EnvSchema.validateSync(process.env, { abortEarly: false });

    console.log("✅ Environment variables loaded successfully");

    return parsedEnv;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      console.error("❌ Invalid environment configuration:");
      error.inner.forEach((err) => {
        console.error(`- ${err.path}: ${err.message}`);
      });
      process.exit(1);
    }
    throw error;
  }
}

// Usage example in server initialization
export const env = loadEnvConfig();

export const isDevMode = env.NODE_ENV === "development";
