import { inject, injectable } from "tsyringe";
import IUser from "../entities/User/IUser";
import IUserRepository from "../repositories/UserRepository/IUserRepository";

@injectable()
export default class ListUsersService {
    public constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository
    ) { }

    public async execute(): Promise<IUser[]> {
        const users = await this.userRepository.findAll();

        return users;
    }
}
