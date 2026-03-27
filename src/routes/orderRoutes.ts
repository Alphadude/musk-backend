import { Router } from 'express';
import * as orderController from '../controllers/orderController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - orderNumber
 *         - renterName
 *         - renterEmail
 *         - startDate
 *         - endDate
 *         - totalPrice
 *       properties:
 *         id:
 *           type: integer
 *         orderNumber:
 *           type: string
 *         renterName:
 *           type: string
 *         renterEmail:
 *           type: string
 *         equipmentId:
 *           type: integer
 *         vesselId:
 *           type: integer
 *         startDate:
 *           type: string
 *           format: date
 *         endDate:
 *           type: string
 *           format: date
 *         totalPrice:
 *           type: number
 *         status:
 *           type: string
 *         paymentStatus:
 *           type: string
 *         company:
 *           type: string
 *         contactPerson:
 *           type: string
 *         phone:
 *           type: string
 *         industrySector:
 *           type: string
 *         projectLocation:
 *           type: string
 *         totalDuration:
 *           type: string
 *         crewRequested:
 *           type: boolean
 */

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Lease agreement management
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', orderController.createOrder);

// Apply authentication middleware to the following routes (GET is still public within the middleware)
router.use(authMiddleware);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: List all orders
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: List of orders
 */
router.get('/', orderController.getAllOrders);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: Get order by id
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order details
 */
router.get('/:id', orderController.getOrderById);

/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     summary: Update order by id
 *     tags: [Orders]
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
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Updated
 */
router.put('/:id', orderController.updateOrder);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: Remove order by id
 *     tags: [Orders]
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
router.delete('/:id', orderController.deleteOrder);

export default router;
