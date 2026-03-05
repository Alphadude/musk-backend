import { Request, Response } from 'express';
import * as adminService from '../services/adminService';
import { successResponse, errorResponse, notFoundResponse } from '../lib/responseHandler';

export const createAdmin = async (req: Request, res: Response) => {
    try {
        const admin = await adminService.createOrUpdateAdmin(req.body, true);
        res.status(201).json(successResponse('Admin created successfully', admin));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to create admin', error));
    }
};

export const getAllAdmins = async (req: Request, res: Response) => {
    try {
        const admins = await adminService.getAllAdmins();
        res.json(successResponse('Admins fetched successfully', admins));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to fetch admins', error));
    }
};

export const getAdminById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const admin = await adminService.getAdminById(Number(id));
        if (!admin) {
            return res.status(404).json(notFoundResponse('Admin not found'));
        }
        res.json(successResponse('Admin fetched successfully', admin));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to fetch admin', error));
    }
};

export const updateAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const admin = await adminService.createOrUpdateAdmin({ ...req.body, id: Number(id) }, false);
        res.json(successResponse('Admin updated successfully', admin));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to update admin', error));
    }
};

export const deleteAdmin = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await adminService.deleteAdmin(Number(id));
        res.json(successResponse('Admin deleted successfully'));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to delete admin', error));
    }
};
