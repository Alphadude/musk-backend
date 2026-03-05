import { Request, Response } from 'express';
import * as vesselService from '../services/vesselService';
import { successResponse, errorResponse, notFoundResponse } from '../lib/responseHandler';

export const createVessel = async (req: Request, res: Response) => {
    try {
        const vessel = await vesselService.createOrUpdateVessel(req.body, true);
        res.status(201).json(successResponse('Vessel created successfully', vessel));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to create vessel', error));
    }
};

export const getAllVessels = async (req: Request, res: Response) => {
    try {
        const vessels = await vesselService.getAllVessels();
        res.json(successResponse('Vessels fetched successfully', vessels));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to fetch vessels', error));
    }
};

export const getVesselById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const vessel = await vesselService.getVesselById(Number(id));
        if (!vessel) {
            return res.status(404).json(notFoundResponse('Vessel not found'));
        }
        res.json(successResponse('Vessel fetched successfully', vessel));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to fetch vessel', error));
    }
};

export const updateVessel = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const vessel = await vesselService.createOrUpdateVessel({ ...req.body, id: Number(id) }, false);
        res.json(successResponse('Vessel updated successfully', vessel));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to update vessel', error));
    }
};

export const deleteVessel = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await vesselService.deleteVessel(Number(id));
        res.json(successResponse('Vessel deleted successfully'));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to delete vessel', error));
    }
};
