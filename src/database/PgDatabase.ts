import { Client } from "pg";
import IDatabase from "./IDatabase";
import config from "../config/database";

export default class PgDatabase implements IDatabase<Client> {
    private pool: Client;

    public constructor() {
        this.pool = new Client(config);
    }

    public async connect(): Promise<Client> {
        await this.pool.connect();
        return this.pool;
    }

    public async close(): Promise<void> {
        await this.pool.end();
    }

    public getClient(): Client {
        return this.pool;
    }

    public async truncate(): Promise<void> {
        await this.pool.query('BEGIN');

        this.pool.query("DELETE FROM userx ");

        await this.pool.query('COMMIT');
    }
}
