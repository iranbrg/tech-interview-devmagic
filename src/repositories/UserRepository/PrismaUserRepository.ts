import { PrismaClient } from "@prisma/client";
import { injectable } from "tsyringe";
import db from "../../database";
import IUser from "../../entities/User/IUser";
import IUserRepository from "./IUserRepository";

@injectable()
export default class PrismaUserRepository implements IUserRepository {
    private db: PrismaClient;

    public constructor() {
        this.db = db.getClient();
    }

    public async create(
        name: string,
        email: string,
        password: string,
        level: number
    ): Promise<IUser> {
        return this.db.user.create({
            data: {
                name,
                email,
                password,
                level
            }
        });
    }

    public async findAll(): Promise<IUser[]> {
        return this.db.user.findMany();
    }

    public async findByEmail(
        email: string
    ): Promise<IUser | null> {
        return this.db.user.findUnique({
            where: {
                email
            }
        });
    }
}
