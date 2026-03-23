import express from 'express';
import type { Router } from 'express';
import brandsController from '../../controllers/brands.controller';
const router: Router = express.Router();

/**
 * @openapi
 * /brands:
 *   get:
 *     tags:
 *       - Brands
 *     summary: Get all brands
 *     responses:
 *       200:
 *         description: List of brands
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessBrandsResponse'
 */
// GET /api/v1/brands
router.get('/', brandsController.getAllBrands);

/**
 * @openapi
 * /brands/{id}:
 *   get:
 *     tags:
 *       - Brands
 *     summary: Get brand by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Brand detail
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessBrandResponse'
 *       404:
 *         description: Brand not found
 */
// GET /api/v1/brands/:id
router.get('/:id', brandsController.getBrandById);

/**
 * @openapi
 * /brands:
 *   post:
 *     tags:
 *       - Brands
 *     summary: Create a brand
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BrandInput'
 *     responses:
 *       201:
 *         description: Created brand
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/SuccessBrandResponse'
 *                 - type: object
 *                   properties:
 *                     statusCode:
 *                       example: 201
 *                     message:
 *                       example: Created
 */
// POST /api/v1/brands
router.post('/', brandsController.createBrand);

/**
 * @openapi
 * /brands/{id}:
 *   put:
 *     tags:
 *       - Brands
 *     summary: Update a brand by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BrandInput'
 *     responses:
 *       200:
 *         description: Updated brand
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessBrandResponse'
 *       404:
 *         description: Brand not found
 */
// PUT /api/v1/brands/:id
router.put('/:id', brandsController.updateBrandById);

/**
 * @openapi
 * /brands/{id}:
 *   delete:
 *     tags:
 *       - Brands
 *     summary: Delete a brand by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deleted result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessBrandDeleteResponse'
 *       404:
 *         description: Brand not found
 */
// DELETE /api/v1/brands/:id
router.delete('/:id', brandsController.deleteBrandById);

export default router;
