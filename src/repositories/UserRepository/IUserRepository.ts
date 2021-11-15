import IUser from "../../entities/User/IUser";

export default interface IUserRepository {
    create(
        name: string,
        email: string,
        password: string,
        level: number
    ): Promise<IUser>;
    findByEmail(email: string): Promise<IUser | null>;
    findAll(): Promise<IUser[]>;
}
