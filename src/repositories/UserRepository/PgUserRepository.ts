import { Client } from "pg";
import { injectable } from "tsyringe";
import db from "../../database";
import IUser from "../../entities/User/IUser";
import PgUser from "../../entities/User/PgUser";
import IUserRepository from "./IUserRepository";

@injectable()
export default class PgUserRepository implements IUserRepository {
    private db: Client;

    public constructor() {
        this.db = db.getClient();
    }

    public async create(
        name: string,
        email: string,
        password: string,
        level: number
    ): Promise<IUser> {
        const user = new PgUser(name, email, password, level);

        const query = "INSERT INTO users VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *";
        const values = Object.values(user);
        const res = await this.db.query(query, values);

        const newUser = res.rows[0];

        return newUser;
    }

    public async findAll(): Promise<IUser[]> {
        const query = "SELECT * FROM users";
        const res = await this.db.query(query);

        const users = res.rows;

        return users || null;
    }

    public async findByEmail(email: string): Promise<IUser | null> {
        const query = "SELECT * FROM users WHERE email = $1";
        const values = [email];
        const res = await this.db.query(query, values);

        const user = res.rows[0];

        return user || null;
    }
}
