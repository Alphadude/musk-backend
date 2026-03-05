import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { comparePassword, generateToken } from '../services/authService';
import { successResponse, errorResponse } from '../lib/responseHandler';

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json(errorResponse('Email and password are required', null));
        }

        const admin = await prisma.admin.findUnique({
            where: { email }
        });

        if (!admin) {
            return res.status(401).json(errorResponse('Invalid email or password', null));
        }

        const isPasswordValid = await comparePassword(password, admin.password);

        if (!isPasswordValid) {
            return res.status(401).json(errorResponse('Invalid email or password', null));
        }

        // Update last login
        await prisma.admin.update({
            where: { id: admin.id },
            data: { lastLogin: new Date() }
        });

        const token = generateToken(admin.id, admin.email);

        res.json(successResponse('Login successful', {
            token,
            admin: {
                id: admin.id,
                name: admin.name,
                email: admin.email,
                role: admin.role
            }
        }));
    } catch (error: any) {
        res.status(500).json(errorResponse(error.message));
    }
};
