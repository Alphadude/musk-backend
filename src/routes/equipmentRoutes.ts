import { Router } from 'express';
import * as equipmentController from '../controllers/equipmentController';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Equipment:
 *       type: object
 *       required:
 *         - companyId
 *         - name
 *         - category
 *       properties:
 *         id:
 *           type: integer
 *         companyId:
 *           type: integer
 *         status:
 *           type: string
 *         condition:
 *           type: string
 *         name:
 *           type: string
 *         category:
 *           type: string
 *         details:
 *           type: string
 *         weight:
 *           type: number
 *         yearManufactured:
 *           type: integer
 *         hourlyRate:
 *           type: number
 *         dailyRate:
 *           type: number
 *         monthlyRate:
 *           type: number
 *         images:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Equipment
 *   description: Equipment asset management
 */

/**
 * @swagger
 * /api/equipment:
 *   post:
 *     summary: Create new equipment
 *     tags: [Equipment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Equipment'
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', equipmentController.createEquipment);

/**
 * @swagger
 * /api/equipment:
 *   get:
 *     summary: List all equipment
 *     tags: [Equipment]
 *     responses:
 *       200:
 *         description: List of equipment
 */
router.get('/', equipmentController.getAllEquipments);

/**
 * @swagger
 * /api/equipment/{id}:
 *   get:
 *     summary: Get equipment by id
 *     tags: [Equipment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Equipment details
 */
router.get('/:id', equipmentController.getEquipmentById);

/**
 * @swagger
 * /api/equipment/{id}:
 *   put:
 *     summary: Update equipment by id
 *     tags: [Equipment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Equipment'
 *     responses:
 *       200:
 *         description: Updated
 */
router.put('/:id', equipmentController.updateEquipment);

/**
 * @swagger
 * /api/equipment/{id}:
 *   delete:
 *     summary: Remove equipment by id
 *     tags: [Equipment]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Deleted
 */
router.delete('/:id', equipmentController.deleteEquipment);

export default router;
