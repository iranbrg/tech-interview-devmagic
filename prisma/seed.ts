import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { ROOT_USER } from "../src/utils/constants";

const prisma = new PrismaClient();

async function main(): Promise<void> {
    await prisma.user.upsert({
        where: { email: "root@botzap.com" },
        update: {
            ...ROOT_USER,
            password: await hash(ROOT_USER.password, 8)
        },
        create: {
            ...ROOT_USER,
            password: await hash(ROOT_USER.password, 8)
        }
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
