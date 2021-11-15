import UserDTO from "../../src/dto/UserDTO";
import IJWTProvider from "../../src/providers/JWTProvider/IJWTProvider";
import FakeUserRepository from "../../src/repositories/UserRepository/FakeUserRepository";
import IUserRepository from "../../src/repositories/UserRepository/IUserRepository";
import AuthenticateUserService from "../../src/services/AuthenticateUserService";
import FakeJWTProvider from "../../src/providers/JWTProvider/FakeJWTProvider";
import FakeHashProvider from "../../src/providers/HashProvider/FakeHashProvider";
import { ApiError } from "../../src/utils/errors";
import { ROOT_USER } from "../../src/utils/constants";
import IHashProvider from "../../src/providers/HashProvider/IHashProvider";
import AuthDTO from "../../src/dto/AuthDTO";

describe("AuthenticateUserService", () => {
    let userRepository: IUserRepository;
    let jwtProvider: IJWTProvider;
    let hashProvider: IHashProvider;
    let autheticateUserService: AuthenticateUserService;

    beforeEach(() => {
        userRepository = new FakeUserRepository();
        jwtProvider = new FakeJWTProvider();
        hashProvider = new FakeHashProvider();
        autheticateUserService = new AuthenticateUserService(
            userRepository,
            jwtProvider,
            hashProvider
        );
    });

    test("Should generate an access token", async () => {
        const userProps: UserDTO = { ...ROOT_USER };

        const user = await userRepository.findByEmail(userProps.email);

        const accessToken = await autheticateUserService.execute(userProps);

        const payload = await jwtProvider.verifySecretKey(accessToken);

        expect(payload).toHaveProperty("sub", user?.id);
    });

    test("Shouldn't create an access token if the email provided doesn't belong to any user", async () => {
        const userProps: AuthDTO = {
            email: "wrong_email@lavanderia.com",
            password: ROOT_USER.password
        };

        await expect(autheticateUserService.execute(userProps)).rejects.toEqual(
            new ApiError("Wrong combination between email and password")
        );
    });

    test("Shouldn't create an access token if the password provided is wrongly provided", async () => {
        const userProps: AuthDTO = { email: ROOT_USER.email, password: "1337" };

        await expect(autheticateUserService.execute(userProps)).rejects.toEqual(
            new ApiError("Wrong combination between email and password")
        );
    });
});
