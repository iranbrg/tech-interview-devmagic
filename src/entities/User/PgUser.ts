import IUser from "./IUser";
import { v4 as uuidv4 } from 'uuid';

export default class PgUser implements IUser {
    public readonly id: string;
    public name: string;
    public email: string;
    public password: string;
    public level: number;
    public createdAt: Date;
    public updatedAt: Date;

    public constructor(
        name: string,
        email: string,
        password: string,
        level: number
    ) {
        this.id = uuidv4();
        this.name = name;
        this.email = email;
        this.password = password;
        this.level = level;
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }
}
