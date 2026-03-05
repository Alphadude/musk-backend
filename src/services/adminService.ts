import { Prisma } from '@prisma/client';
import prisma from '../lib/prisma';
import { IAdmin } from '../interfaces/admin';
import { hashPassword } from './authService';

export const createOrUpdateAdmin = async (data: IAdmin, isCreate: boolean) => {
    // Hash password if provided
    let hashedPassword = data.password;
    if (data.password) {
        hashedPassword = await hashPassword(data.password);
    }

    const adminData: Prisma.AdminCreateInput = {
        name: data.name,
        email: data.email,
        password: hashedPassword || "",
        role: data.role || "Viewer",
        status: data.status || "Active",
        lastLogin: data.lastLogin || null,
    };

    if (isCreate) {
        return await prisma.admin.create({
            data: adminData
        });
    } else {
        if (!data.id) {
            throw new Error('Invalid admin ID for update');
        }

        const uniqueAdmin = await prisma.admin.findUnique({
            where: { id: data.id }
        });

        if (!uniqueAdmin) {
            throw new Error('Admin not found');
        }

        return await prisma.admin.update({
            where: { id: data.id },
            data: adminData
        });
    }
};

export const getAllAdmins = async () => {
    return await prisma.admin.findMany();
};

export const getAdminById = async (id: number) => {
    return await prisma.admin.findUnique({
        where: { id }
    });
};

export const deleteAdmin = async (id: number) => {
    return await prisma.admin.delete({
        where: { id }
    });
};
