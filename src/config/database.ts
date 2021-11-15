interface DbConfig {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
}

export default {
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: parseInt(process.env.POSTGRES_PORT as string)
} as DbConfig;
