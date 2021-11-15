import IUser from "../../entities/User/IUser";
import IUserRepository from "./IUserRepository";

export default class FakeUserRepository implements IUserRepository {
    private users: IUser[] = [];

    public async create(
        name: string,
        email: string,
        password: string,
        level: number
    ): Promise<IUser> {
        const newUser: IUser = {
            id: String(Math.floor(Math.random() * 100000000)),
            name,
            email,
            password,
            level,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        this.users.push(newUser);

        return newUser;
    }

    public async findAll(): Promise<IUser[]> {
        return this.users;
    }

    public async findByEmail(
        email: string
    ): Promise<IUser | null> {
        const foundUser = this.users.find(
            user => user.email === email
        );

        return foundUser || null;
    }

    // public async findById(userId: string): Promise<IUser | null> {
    //     const foundUser = this.users.find(
    //         user => user.id === userId
    //     );
    //     return foundUser || null;
    // }

    // public async update(
    //     userId: string,
    //     firstName: string,
    //     lastName: string,
    //     phoneNumber: string
    // ): Promise<IUser> {
    //     const foundUser = this.users.find(
    //         user => user.id === userId
    //     );

    //     if (!foundUser) throw new Error("Rocord not found");

    //     foundUser.firstName = firstName;
    //     foundUser.lastName = lastName;
    //     foundUser.phoneNumber = phoneNumber;

    //     return foundUser;
    // }

    // public async delete(userId: string): Promise<void> {
    //     let idx: number;
    //     const user = this.users.find(c => c.id === userId);

    //     if (user) {
    //         idx = this.users.indexOf(user);
    //         this.users.splice(idx, 1);
    //     }
    // }
}
