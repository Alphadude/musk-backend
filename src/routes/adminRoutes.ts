import { Router } from 'express';
import * as adminController from '../controllers/adminController';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *         role:
 *           type: string
 *           enum:
 *             - Admin
 *             - Manager
 *             - Viewer
 *           description: "Role of the admin user. Options: Admin, Manager, Viewer."
 */

/**
 * @swagger
 * tags:
 *   name: Admins
 *   description: Admin user management
 */

/**
 * @swagger
 * /api/admins:
 *   post:
 *     summary: Create a new admin
 *     tags: [Admins]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       201:
 *         description: Created
 */
router.post('/', adminController.createAdmin);

/**
 * @swagger
 * /api/admins:
 *   get:
 *     summary: List all admins
 *     tags: [Admins]
 *     responses:
 *       200:
 *         description: List of admins
 */
router.get('/', adminController.getAllAdmins);

/**
 * @swagger
 * /api/admins/{id}:
 *   get:
 *     summary: Get admin by id
 *     tags: [Admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Admin details
 */
router.get('/:id', adminController.getAdminById);

/**
 * @swagger
 * /api/admins/{id}:
 *   put:
 *     summary: Update admin by id
 *     tags: [Admins]
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
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: Updated
 */
router.put('/:id', adminController.updateAdmin);

/**
 * @swagger
 * /api/admins/{id}:
 *   delete:
 *     summary: Remove admin by id
 *     tags: [Admins]
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
router.delete('/:id', adminController.deleteAdmin);

export default router;
