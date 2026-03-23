import { model, Schema } from 'mongoose';

/**
 * @openapi
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 67de7db0a321bcf8b6f1a001
 *         brand_name:
 *           type: string
 *           maxLength: 50
 *           example: Apple
 *         description:
 *           type: string
 *           maxLength: 500
 *           example: Premium technology brand
 *         slug:
 *           type: string
 *           maxLength: 165
 *           example: apple
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     BrandInput:
 *       type: object
 *       required:
 *         - brand_name
 *         - slug
 *       properties:
 *         brand_name:
 *           type: string
 *           maxLength: 50
 *           example: Apple
 *         description:
 *           type: string
 *           maxLength: 500
 *           example: Premium technology brand
 *         slug:
 *           type: string
 *           maxLength: 165
 *           example: apple
 *     BrandDeleteResult:
 *       type: object
 *       properties:
 *         acknowledged:
 *           type: boolean
 *           example: true
 *         deletedCount:
 *           type: number
 *           example: 1
 *     SuccessBrandResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: number
 *           example: 200
 *         message:
 *           type: string
 *           example: Success
 *         data:
 *           $ref: '#/components/schemas/Brand'
 *     SuccessBrandsResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: number
 *           example: 200
 *         message:
 *           type: string
 *           example: Success
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Brand'
 *     SuccessBrandDeleteResponse:
 *       type: object
 *       properties:
 *         statusCode:
 *           type: number
 *           example: 200
 *         message:
 *           type: string
 *           example: Success
 *         data:
 *           $ref: '#/components/schemas/BrandDeleteResult'
 */

//Định nghĩa schema
const brandSchema = new Schema({
    brand_name: {
        type: String,
        required: true,
        unique: true, //Không được trùng lặp
        maxLength: 50, //Độ dài tối đa 50 ký tự
    },
    description: {
        type: String,
        required: false, //Không bắt buộc
        maxLength: 500, //Độ dài tối đa 50 ký tự
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        maxLength: 165,
    }
},{})

//Tạo model
const Brand = model('Brand', brandSchema);
export default Brand;