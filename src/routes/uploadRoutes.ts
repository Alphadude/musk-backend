import { Router } from 'express';
import * as uploadController from '../controllers/uploadController';

const router = Router();

/**
 * @swagger
 * /api/uploads:
 *   post:
 *     summary: Upload a file to Cloudinary
 *     tags: [Uploads]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - data
 *               - type
 *             properties:
 *               data:
 *                 type: string
 *                 description: Base64 encoded file data
 *               type:
 *                 type: string
 *                 description: MIME type of the file (e.g. image/png)
 *     responses:
 *       201:
 *         description: File uploaded successfully
 *       400:
 *         description: Missing data or type
 */
router.post('/', uploadController.uploadFile);

/**
 * @swagger
 * /api/uploads/{publicId}:
 *   delete:
 *     summary: Delete a file from Cloudinary
 *     tags: [Uploads]
 *     parameters:
 *       - in: path
 *         name: publicId
 *         required: true
 *         schema:
 *           type: string
 *         description: The public ID or URL of the file to delete
 *     responses:
 *       200:
 *         description: File deleted successfully
 *       500:
 *         description: Deletion failed
 */
router.delete('/:publicId', uploadController.deleteFile);

export default router;
