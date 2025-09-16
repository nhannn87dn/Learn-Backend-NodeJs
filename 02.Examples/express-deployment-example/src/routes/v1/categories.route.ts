import express from "express";
import categoriesController from "../../controllers/categories.controller";
const router   = express.Router();

/**
 * @openapi
 * tags:
 *   name: Categories
 *   description: API endpoints for managing categories
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     CategoryResponse:
 *       type: object
 *       properties:
 *         metadata:
 *           type: object
 *           properties:
 *             limit:
 *               type: integer
 *               description: Number of items per page
 *             page:
 *               type: integer
 *               description: Current page number
 *             totalPages:
 *               type: integer
 *               description: Total number of pages
 *             totalItems:
 *               type: integer
 *               description: Total number of items
 *             filteredCount:
 *               type: integer
 *               description: Number of items after filtering
 *             sortBy:
 *               type: object
 *               description: Sorting information
 *         categories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message
 */

//Dinh nghia cac routes cho resource Categories

/**
 * @openapi
 * /api/v1/categories:
 *   get:
 *     summary: Get all categories with pagination and sorting
 *     tags: [Categories]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 5
 *         description: Number of items per page
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *           default: sort
 *         description: Field to sort by
 *       - in: query
 *         name: sortType
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *           default: ASC
 *         description: Sort direction
 *     responses:
 *       200:
 *         description: List of categories successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoryResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('',  categoriesController.getAll)

/**
 * @openapi
 * /api/v1/categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', categoriesController.getCategoryById)


/**
 * @openapi
 * /api/v1/categories:
 *   post:
 *     summary: Create a new category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - categoryName
 *             properties:
 *               categoryName:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *                 description: Name of the category
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 description: Description of the category
 *               slug:
 *                 type: string
 *                 pattern: ^[a-z0-9\-]+$
 *                 description: URL-friendly version of the name (auto-generated if not provided)
 *               sort:
 *                 type: number
 *                 minimum: 1
 *                 default: 50
 *                 description: Sorting order
 *               isActive:
 *                 type: boolean
 *                 default: true
 *                 description: Category status
 *     responses:
 *       201:
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('',  categoriesController.createCategory)

/**
 * @openapi
 * /api/v1/categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryName:
 *                 type: string
 *                 minLength: 3
 *                 maxLength: 50
 *                 description: Name of the category
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 description: Description of the category
 *               slug:
 *                 type: string
 *                 pattern: ^[a-z0-9\-]+$
 *                 description: URL-friendly version of the name
 *               sort:
 *                 type: number
 *                 minimum: 1
 *                 description: Sorting order
 *               isActive:
 *                 type: boolean
 *                 description: Category status
 *     responses:
 *       200:
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', categoriesController.updateCategory)

/**
 * @openapi
 * /api/v1/categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', categoriesController.deleteCategory)

export default router