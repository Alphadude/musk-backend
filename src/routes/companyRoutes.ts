import { Router } from 'express';
import * as companyController from '../controllers/companyController';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - location
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the company
 *         logo:
 *           type: string
 *           description: URL to company logo
 *         banner:
 *           type: string
 *           description: URL to company banner
 *         name:
 *           type: string
 *           description: Name of the company
 *         email:
 *           type: string
 *           description: Contact email
 *         phone:
 *           type: string
 *           description: Phone number
 *         country:
 *           type: string
 *           default: Nigeria
 *         location:
 *           type: string
 *         postalCode:
 *           type: string
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: The companies managing assets
 */

/**
 * @swagger
 * /api/companies:
 *   post:
 *     summary: Create a new company
 *     tags: [Companies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *     responses:
 *       201:
 *         description: The company was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       500:
 *         description: Some server error
 */
router.post('/', companyController.createCompany);

/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: Returns the list of all the companies
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: The list of the companies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Company'
 */
router.get('/', companyController.getAllCompanies);

/**
 * @swagger
 * /api/companies/{id}:
 *   get:
 *     summary: Get the company by id
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The company id
 *     responses:
 *       200:
 *         description: The company description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       404:
 *         description: The company was not found
 */
router.get('/:id', companyController.getCompanyById);

/**
 * @swagger
 * /api/companies/{id}:
 *   delete:
 *     summary: Remove the company by id
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The company id
 * 
 *     responses:
 *       200:
 *         description: The company was deleted
 *       404:
 *         description: The company was not found
 */
router.delete('/:id', companyController.deleteCompany);

export default router;
