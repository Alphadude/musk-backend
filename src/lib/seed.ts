import { hashPassword } from '../services/authService';
import prisma from './prisma';

export const seedAdmin = async () => {
    const adminEmail = 'testadmin@example.com';
    const adminPassword = '12345';

    try {
        const existingAdmin = await prisma.admin.findUnique({
            where: { email: adminEmail },
        });

        if (!existingAdmin) {
            const hashedPassword = await hashPassword(adminPassword);
            await prisma.admin.create({
                data: {
                    name: 'Test Admin',
                    email: adminEmail,
                    password: hashedPassword,
                    role: 'Admin',
                    status: 'Active',
                },
            });
            console.log('✅ Default admin user seeded successfully');
        } else {
            console.log('ℹ️ Admin user already exists, skipping seed');
        }
    } catch (error) {
        console.error('❌ Error seeding admin user:', error);
    }
};
