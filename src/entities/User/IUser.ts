export default interface IUser {
    id: string;
    name: string;
    email: string;
    password: string;
    level: number;
    createdAt: Date;
    updatedAt: Date;
}
