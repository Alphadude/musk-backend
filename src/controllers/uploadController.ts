import { Request, Response } from 'express';
import * as uploadService from '../services/uploadService';
import { successResponse, errorResponse } from '../lib/responseHandler';

export const uploadFile = async (req: Request, res: Response) => {
    try {
        const { data, type } = req.body;
        if (!data || !type) {
            return res.status(400).json(errorResponse('Base64 data and type are required', null));
        }
        const url = await uploadService.uploadImage(data, type);
        res.status(201).json(successResponse('File uploaded successfully', { url }));
    } catch (error: any) {
        res.status(500).json(errorResponse(error.message));
    }
};

export const deleteFile = async (req: Request, res: Response) => {
    try {
        const { publicId } = req.params;
        if (!publicId) {
            return res.status(400).json(errorResponse('publicId is required', null));
        }
        await uploadService.deleteImage(publicId as string);
        res.json(successResponse('File deleted successfully', null));
    } catch (error: any) {
        res.status(500).json(errorResponse(error.message));
    }
};
