import { inject, injectable } from "tsyringe";
import AuthDTO from "../dto/AuthDTO";
import IHashProvider from "../providers/HashProvider/IHashProvider";
import IJWTProvider from "../providers/JWTProvider/IJWTProvider";
import IUserRepository from "../repositories/UserRepository/IUserRepository";
import { AuthError } from "../utils/errors";

@injectable()
export default class AuthenticateUserService {
    public constructor(
        @inject("UserRepository")
        private userRepository: IUserRepository,

        @inject("JWTProvider")
        private JWTProvider: IJWTProvider,

        @inject("HashProvider")
        private hashProvider: IHashProvider
    ) { }

    public async execute({ email, password }: AuthDTO): Promise<string> {
        const user = await this.userRepository.findByEmail(email);

        if (!user) {
            throw new AuthError("Wrong combination between email and password");
        }

        const didPasswordMatch = await this.hashProvider.compare(
            password,
            user.password
        );

        if (!didPasswordMatch) {
            throw new AuthError("Wrong combination between email and password");
        }

        const accessToken = await this.JWTProvider.generateAccessToken({
            sub: user.id
        });

        return accessToken;
    }
}
