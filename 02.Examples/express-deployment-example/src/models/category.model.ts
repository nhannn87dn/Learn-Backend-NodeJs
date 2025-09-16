import { Schema, model } from 'mongoose';
import { ICategory } from '../types/models';
import buildSlug from '../helpers/slugHelper'
import { NextFunction } from 'express';

/**
 * @openapi
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - categoryName
 *         - slug
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the category
 *         categoryName:
 *           type: string
 *           minLength: 3
 *           maxLength: 50
 *           description: Name of the category
 *         description:
 *           type: string
 *           maxLength: 500
 *           description: Description of the category
 *         slug:
 *           type: string
 *           maxLength: 255
 *           pattern: ^[a-z0-9\-]+$
 *           description: URL-friendly version of the category name
 *         sort:
 *           type: number
 *           minimum: 1
 *           default: 50
 *           description: Sorting order of the category
 *         isActive:
 *           type: boolean
 *           default: true
 *           description: Whether the category is active
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the category was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the category was last updated
 *       example:
 *         categoryName: "Electronics"
 *         description: "Electronic products and accessories"
 *         slug: "electronics"
 *         sort: 1
 *         isActive: true
 */

const categorySchema = new Schema(
    {
      categoryName: {
        type: String,
        required: [true, 'Yeu cau dien Category Name'],
        unique: [true, 'Category Name khong the trung lap'],
        minLength: [3, 'Toi thieu phai du 3 ki tu'],
        maxLength : [50, 'Toi da cho phep 50 ki tu'],
      },
      description: {
        type: String,
        required: false,
        max: 500
      },
      slug: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        max: 255,
        validate: {
            validator: function (value: string) {
                const slugRegex = /^[a-z0-9\-]+$/;
                return slugRegex.test(value);
            },
            message: 'Slug must be unique and contain only letters, numbers, and hyphens'
          },
      },
      sort: {
        type: Number,
        default: 50,
        min: 1
      },
      isActive: {
        type: Boolean,
        default: true,
        enum: ['true', 'false']
      }
    },
    {
        timestamps: true 
        //created_at
        //updated_at
    }
);

//Middleware
categorySchema.pre('save', async function (next) {
  /**
   * Tự động tạo slug khi slug ko được truyền
   * hoặc slug = ''
   */
  if(this.slug == "" || !this.slug){
      this.slug = buildSlug(this.categoryName);
  }

  next();
});

const Category = model<ICategory>('Category', categorySchema);
export default Category;

