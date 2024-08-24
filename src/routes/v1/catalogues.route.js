const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const cataloguesValidation = require('../../validations/catalogues.validation');
const cataloguesController = require('../../controllers/catalogues.controller');

const router = express.Router();

router
  .route('/')
  .get(validate(cataloguesValidation.getCatalogues), cataloguesController.getCatalogues)
  .post(validate(cataloguesValidation.createCatalogue), cataloguesController.createCatalogue);

// router
//   .route('/:cataloguesId')
//   .get(auth('getCatalogues'), validate(cataloguesValidation.getCatalogues), cataloguesController.getCatalogues);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: catalogues
 *   description: catalogues management and retrieval
 */

/**
 * @swagger
 * /catalogues:
 *   post:
 *     summary: Create a catalogues
 *     description: Only admins can create other catalogues.
 *     tags: [catalogues]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - vendor
 *               - price
 *               - in
 *               - out
 *             properties:
 *               name:
 *                 type: string
 *               vendor:
 *                 type: string
 *               price:
 *                 type: number
 *               in:
 *                 type: number
 *               out:
 *                 type: number
 *             example:
 *               name: chair
 *               vendor: IKEA
 *               price: 500000
 *               in: 800
 *               out: 200
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/catalogues'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all inventories
 *     description: Only admins can retrieve all inventories.
 *     tags: [catalogues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: User name
 *       - in: query
 *         name: role
 *         schema:
 *           type: string
 *         description: User role
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: sort by query in the form of field:desc/asc (ex. name:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of users
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/catalogues'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 */

/**
 *  @swagger
 * /catalogues/{id}:
 *   get:
 *     summary: Get all catalogues
 *     description: Get all catalogues.
 *     tags: [catalogues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: catalogues id
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/catalogues'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a catalogues
 *     description: Delete a catalogues
 *     tags: [catalogues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: catalogues id
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a catalogues
 *     description: Logged in catalogues can only update catalogues
 *     tags: [catalogues]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: catalogues id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               vendor:
 *                 type: string
 *               price:
 *                 type: number
 *               in:
 *                 type: number
 *               out:
 *                 type: number
 *             example:
 *               name: chair
 *               vendor: IKEA
 *               price: 500000
 *               in: 800
 *               out: 200
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/catalogues'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
