import { Router } from 'express';
import * as vesselController from '../controllers/vesselController';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Vessel:
 *       type: object
 *       required:
 *         - companyId
 *         - name
 *         - type
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
 *         type:
 *           type: string
 *         builder:
 *           type: string
 *         yearBuilt:
 *           type: integer
 *         flag:
 *           type: string
 *         totalHP:
 *           type: integer
 *         maxSpeed:
 *           type: number
 *         economicalSpeed:
 *           type: number
 *         engineConfig:
 *           type: string
 *         length:
 *           type: number
 *         breadth:
 *           type: number
 *         depth:
 *           type: number
 *         clearDeckSpace:
 *           type: string
 *         deckCargoCapacity:
 *           type: number
 *         fuelConsumption:
 *           type: number
 *         fuelCapacity:
 *           type: number
 *         waterCapacity:
 *           type: number
 *         mainEngines:
 *           type: string
 *         generators:
 *           type: string
 *         specialEquipment:
 *           type: string
 *         personCapacity:
 *           type: integer
 *         airConditioning:
 *           type: string
 *         additionalAmenities:
 *           type: string
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
 *   name: Vessels
 *   description: Maritime vessel management
 */

/**
 * @swagger
 * /api/vessels:
 *   post:
 *     summary: Create new vessel
 *     tags: [Vessels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Vessel'
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', vesselController.createVessel);

/**
 * @swagger
 * /api/vessels:
 *   get:
 *     summary: List all vessels
 *     tags: [Vessels]
 *     responses:
 *       200:
 *         description: List of vessels
 */
router.get('/', vesselController.getAllVessels);

/**
 * @swagger
 * /api/vessels/{id}:
 *   get:
 *     summary: Get vessel by id
 *     tags: [Vessels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Vessel details
 */
router.get('/:id', vesselController.getVesselById);

/**
 * @swagger
 * /api/vessels/{id}:
 *   put:
 *     summary: Update vessel by id
 *     tags: [Vessels]
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
 *             $ref: '#/components/schemas/Vessel'
 *     responses:
 *       200:
 *         description: Updated
 */
router.put('/:id', vesselController.updateVessel);

/**
 * @swagger
 * /api/vessels/{id}:
 *   delete:
 *     summary: Remove vessel by id
 *     tags: [Vessels]
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
router.delete('/:id', vesselController.deleteVessel);

export default router;
