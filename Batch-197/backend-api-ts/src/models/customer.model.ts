// models/customer.model.ts

import mongoose, { Schema, Model } from "mongoose";
import { ICustomer } from "../types/customer";

const customerSchema = new Schema<ICustomer>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
      maxLength: 100,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxLength: 255,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
      maxLength: 20,
    },
    street: {
        type: String,
        required: true,
        trim: true,
        maxLength: 255,
    },
    city: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100,
    },
    state: {
        type: String,
        required: true,
        trim: true,
        maxLength: 100,
    },
    password: {
        type: String,
        required: false,
        trim: true,
        minLength: 6,
        maxLength: 255,
    },
  },
  {
    timestamps: true,
    collection: "customers",
    versionKey: false, // Loại bỏ trường __v
  }
);

// Index để tìm customer nhanh
customerSchema.index({ email: 1 }, { unique: true });
customerSchema.index({ phone: 1 }, { unique: true });

const Customer: Model<ICustomer> = mongoose.model<ICustomer>("Customer", customerSchema);
export default Customer;