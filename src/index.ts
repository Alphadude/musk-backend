import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import cors from 'cors';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import companyRoutes from './routes/companyRoutes';
import adminRoutes from './routes/adminRoutes';
import equipmentRoutes from './routes/equipmentRoutes';
import vesselRoutes from './routes/vesselRoutes';
import orderRoutes from './routes/orderRoutes';
import uploadRoutes from './routes/uploadRoutes';

import authRoutes from './routes/authRoutes';
import { authMiddleware } from './middleware/authMiddleware';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Swagger Configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'MuskMover API',
            version: '1.0.0',
            description: 'API documentation for MuskMover project',
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.ts'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Public Routes
app.use('/api/auth', authRoutes);

// Protected Routes
app.use('/api/companies', authMiddleware, companyRoutes);
app.use('/api/admins', authMiddleware, adminRoutes);
app.use('/api/equipment', authMiddleware, equipmentRoutes);
app.use('/api/vessels', authMiddleware, vesselRoutes);
app.use('/api/orders', authMiddleware, orderRoutes);
app.use('/api/uploads', authMiddleware, uploadRoutes);

// Basic health check
app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', message: 'MuskMover Backend is running (TypeScript)' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});
