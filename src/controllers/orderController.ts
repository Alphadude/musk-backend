import { Request, Response } from 'express';
import * as orderService from '../services/orderService';
import { successResponse, errorResponse, notFoundResponse } from '../lib/responseHandler';

export const createOrder = async (req: Request, res: Response) => {
    try {
        const order = await orderService.createOrUpdateOrder(req.body, true);
        res.status(201).json(successResponse('Order created successfully', order));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to create order', error));
    }
};

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await orderService.getAllOrders();
        res.json(successResponse('Orders fetched successfully', orders));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to fetch orders', error));
    }
};

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const order = await orderService.getOrderById(Number(id));
        if (!order) {
            return res.status(404).json(notFoundResponse('Order not found'));
        }
        res.json(successResponse('Order fetched successfully', order));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to fetch order', error));
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const order = await orderService.createOrUpdateOrder({ ...req.body, id: Number(id) }, false);
        res.json(successResponse('Order updated successfully', order));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to update order', error));
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await orderService.deleteOrder(Number(id));
        res.json(successResponse('Order deleted successfully'));
    } catch (error) {
        res.status(500).json(errorResponse('Failed to delete order', error));
    }
};
