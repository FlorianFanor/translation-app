import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
    // Create a new user
    const user = await prisma.user.create({
        data: {
            name: 'Alice',
            email: 'foo@gmail.com',
            password: 'password',
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    });
    console.log('Created user:', user);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
