import { inject, injectable } from "tsyringe";
import UserDTO from "../dto/UserDTO";
import IUser from "../entities/User/IUser";
import IHashProvider from "../providers/HashProvider/IHashProvider";
import IUserRepository from "../repositories/UserRepository/IUserRepository";
import { ApiError } from "../utils/errors";

@injectable()
export default class CreateUserService {
    public constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,

        @inject("HashProvider")
        private hashProvider: IHashProvider
    ) { }

    public async execute({
        name,
        email,
        password,
        level
    }: UserDTO): Promise<IUser> {
        const user = await this.userRepository.findByEmail(email);

        if (user) {
            throw new ApiError("User already registered");
        }

        const hashedPassword = await this.hashProvider.generateHash(password, 8);

        const newUser = await this.userRepository.create(
            name,
            email,
            hashedPassword,
            level
        );

        return newUser;
    }
}
