import { Prisma } from '@prisma/client';
import prisma from '../lib/prisma';
import { IAdmin } from '../interfaces/admin';
import { hashPassword } from './authService';

export const createOrUpdateAdmin = async (data: IAdmin, isCreate: boolean) => {
    if (isCreate) {
        // Hashing is mandatory for new admins
        if (!data.password) {
            throw new Error('Password is required for new admin creation');
        }

        const hashedPassword = await hashPassword(data.password);

        const adminData: Prisma.AdminCreateInput = {
            name: data.name,
            email: data.email,
            password: hashedPassword,
            role: data.role || "Viewer",
            status: data.status || "Active",
            lastLogin: data.lastLogin || null,
        };

        const admin = await prisma.admin.create({
            data: adminData
        });
        const { password: _, ...adminWithoutPassword } = admin;
        return adminWithoutPassword;
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

        // Prepare update data - only include fields if they are provided
        const updateData: Prisma.AdminUpdateInput = {
            name: data.name,
            email: data.email,
            role: data.role,
            status: data.status,
            lastLogin: data.lastLogin,
        };

        // Only update password if a new one is provided
        if (data.password) {
            updateData.password = await hashPassword(data.password);
        }

        const admin = await prisma.admin.update({
            where: { id: data.id },
            data: updateData
        });
        const { password: _, ...adminWithoutPassword } = admin;
        return adminWithoutPassword;
    }
};

export const getAllAdmins = async () => {
    return await prisma.admin.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            lastLogin: true,
            createdAt: true,
            updatedAt: true,
        }
    });
};

export const getAdminById = async (id: number) => {
    return await prisma.admin.findUnique({
        where: { id },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            status: true,
            lastLogin: true,
            createdAt: true,
            updatedAt: true,
        }
    });
};

export const deleteAdmin = async (id: number) => {
    return await prisma.admin.delete({
        where: { id }
    });
};
