import { Request, Response } from 'express';
import * as equipmentService from '../services/equipmentService';
import { successResponse, errorResponse, notFoundResponse } from '../lib/responseHandler';

export const createEquipment = async (req: Request, res: Response) => {
    try {
        const equipment = await equipmentService.createOrUpdateEquipment(req.body, true);
        res.status(201).json(successResponse('Equipment created successfully', equipment));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to create equipment', error));
    }
};

export const getAllEquipments = async (req: Request, res: Response) => {
    try {
        const equipments = await equipmentService.getAllEquipments();
        res.json(successResponse('Equipments fetched successfully', equipments));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to fetch equipments', error));
    }
};

export const getEquipmentById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const equipment = await equipmentService.getEquipmentById(Number(id));
        if (!equipment) {
            return res.status(404).json(notFoundResponse('Equipment not found'));
        }
        res.json(successResponse('Equipment fetched successfully', equipment));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to fetch equipment', error));
    }
};

export const updateEquipment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const equipment = await equipmentService.createOrUpdateEquipment({ ...req.body, id: Number(id) }, false);
        res.json(successResponse('Equipment updated successfully', equipment));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to update equipment', error));
    }
};

export const deleteEquipment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await equipmentService.deleteEquipment(Number(id));
        res.json(successResponse('Equipment deleted successfully'));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to delete equipment', error));
    }
};
