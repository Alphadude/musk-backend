import { Router } from 'express';
import * as companyController from '../controllers/companyController';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Company:
 *       type: object
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
 *
 *     CreateCompanyInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - location
 *       properties:
 *         name:
 *           type: string
 *           example: Musk Movers Ltd
 *         email:
 *           type: string
 *           example: info@muskmovers.com
 *         phone:
 *           type: string
 *           example: "+2348012345678"
 *         location:
 *           type: string
 *           example: Lagos, Nigeria
 *         country:
 *           type: string
 *           default: Nigeria
 *           example: Nigeria
 *         logo:
 *           type: string
 *           example: https://cdn.example.com/logo.png
 *         banner:
 *           type: string
 *           example: https://cdn.example.com/banner.png
 *         postalCode:
 *           type: string
 *           example: "100001"
 *         description:
 *           type: string
 *           example: A leading logistics company.
 *
 *     UpdateCompanyInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - location
 *       properties:
 *         name:
 *           type: string
 *           example: Musk Movers Ltd
 *         email:
 *           type: string
 *           example: info@muskmovers.com
 *         phone:
 *           type: string
 *           example: "+2348012345678"
 *         location:
 *           type: string
 *           example: Lagos, Nigeria
 *         country:
 *           type: string
 *           example: Nigeria
 *         logo:
 *           type: string
 *           example: https://cdn.example.com/logo.png
 *         banner:
 *           type: string
 *           example: https://cdn.example.com/banner.png
 *         postalCode:
 *           type: string
 *           example: "100001"
 *         description:
 *           type: string
 *           example: A leading logistics company.
 */

/**
 * @swagger
 * tags:
 *   name: Companies
 *   description: Company management endpoints
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
 *             $ref: '#/components/schemas/CreateCompanyInput'
 *     responses:
 *       201:
 *         description: Company created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Company created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Company'
 *       500:
 *         description: Internal server error
 */
router.post('/', companyController.createCompany);

/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: Get all companies
 *     tags: [Companies]
 *     responses:
 *       200:
 *         description: List of all companies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Companies fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Company'
 */
router.get('/', companyController.getAllCompanies);

/**
 * @swagger
 * /api/companies/{id}:
 *   get:
 *     summary: Get a company by ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The company ID
 *     responses:
 *       200:
 *         description: Company fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Company fetched successfully
 *                 data:
 *                   $ref: '#/components/schemas/Company'
 *       404:
 *         description: Company not found
 */
router.get('/:id', companyController.getCompanyById);

/**
 * @swagger
 * /api/companies/{id}:
 *   put:
 *     summary: Update an existing company
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the company to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCompanyInput'
 *     responses:
 *       200:
 *         description: Company updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Company updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Company'
 *       404:
 *         description: Company not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', companyController.updateCompany);

/**
 * @swagger
 * /api/companies/{id}:
 *   delete:
 *     summary: Delete a company by ID
 *     tags: [Companies]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The company ID
 *     responses:
 *       200:
 *         description: Company deleted successfully
 *       404:
 *         description: Company not found
 */
router.delete('/:id', companyController.deleteCompany);

export default router;
