import { Prisma } from "@prisma/client";
import prisma from '../lib/prisma';
import { ICompany } from '../interfaces/company';

export const createOrUpdateCompany = async (data: ICompany, isCreate: boolean) => {
    const companyData: Prisma.CompanyCreateInput = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        logo: data.logo || null,
        banner: data.banner || null,
        country: data.country || "Nigeria",
        location: data.location,
        postalCode: data.postalCode || null,
        description: data.description || null,
        status: data.status || "Unverified",
    };

    if (isCreate) {
        const company = await prisma.company.create({
            data: companyData
        });

        const { createNotification } = require('./notificationService');
        await createNotification({
            title: 'New Company Registered',
            message: `A new company (${company.name}) has been registered.`,
            type: 'Company',
            relatedId: company.id,
        });

        return company;
    } else {
        if (!data.id) {
            throw new Error('Invalid company ID for update');
        }

        const uniqueCompany = await prisma.company.findUnique({
            where: { id: data.id }
        });

        if (!uniqueCompany) {
            throw new Error('Company not found');
        }

        return await prisma.company.update({
            where: { id: data.id },
            data: companyData
        });
    }
};

export const verifyCompany = async (id: number) => {
    const company = await prisma.company.findUnique({
        where: { id }
    });

    if (!company) {
        throw new Error('Company not found');
    }

    return await prisma.company.update({
        where: { id },
        data: { status: "Verified" }
    });
};

export const getAllCompanies = async () => {
    return await prisma.company.findMany({
        include: {
            equipments: true,
            vessels: true
        }
    });
};

export const getCompanyById = async (id: number) => {
    return await prisma.company.findUnique({
        where: { id },
        include: {
            equipments: true,
            vessels: true
        }
    });
};

export const deleteCompany = async (id: number) => {
    return await prisma.company.delete({
        where: { id }
    });
};
