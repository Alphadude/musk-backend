import { Request, Response } from 'express';
import * as companyService from '../services/companyService';
import { successResponse, errorResponse, notFoundResponse } from '../lib/responseHandler';

export const createCompany = async (req: Request, res: Response) => {
    try {
        const company = await companyService.createOrUpdateCompany(req.body, true);
        res.status(201).json(successResponse('Company created successfully', company));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to create company', error));
    }
};

export const updateCompany = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const payload = { ...req.body, id };
        const company = await companyService.createOrUpdateCompany(payload, false);
        res.json(successResponse('Company updated successfully', company));
    } catch (error: any) {
        if (error?.message === 'Company not found') {
            return res.status(404).json(notFoundResponse('Company not found'));
        }
        res.status(500).json(errorResponse('Failed to update company', error));
    }
};

export const getAllCompanies = async (req: Request, res: Response) => {
    try {
        const companies = await companyService.getAllCompanies();
        res.json(successResponse('Companies fetched successfully', companies));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to fetch companies', error));
    }
};

export const getCompanyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const company = await companyService.getCompanyById(Number(id));
        if (!company) {
            return res.status(404).json(notFoundResponse('Company not found'));
        }
        res.json(successResponse('Company fetched successfully', company));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to fetch company', error));
    }
};

export const deleteCompany = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await companyService.deleteCompany(Number(id));
        res.json(successResponse('Company deleted successfully'));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to delete company', error));
    }
};
