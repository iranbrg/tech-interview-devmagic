import request from "supertest";
import { container } from "tsyringe";
import app from "../../src/app";
import db from "../../src/database";
import UserDTO from "../../src/dto/UserDTO";
import IJWTProvider from "../../src/providers/JWTProvider/IJWTProvider";
import IUserRepository from "../../src/repositories/UserRepository/IUserRepository";
import { Http, ROOT_USER } from "../../src/utils/constants";

describe("AuthController", () => {
    beforeAll(async () => {
        await db.connect();
    });

    beforeEach(async () => {
        await db.truncate();
    });

    afterAll(async () => {
        await db.close();
    });

    describe("POST /v1/auth", () => {
        test("Should generate an access token", async () => {
            const userProps: UserDTO = { ...ROOT_USER };

            const res = await request(app).post("/v1/auth").send({
                email: userProps.email,
                password: userProps.password
            });

            const { accessToken } = res.body.data;

            const userRepository: IUserRepository =
                container.resolve("UserRepository");
            const user = await userRepository.findByEmail(userProps.email);

            const jwtProvider: IJWTProvider = container.resolve("JWTProvider");
            const payload = await jwtProvider.verifySecretKey(accessToken);

            expect(res.status).toEqual(Http.Ok);
            expect(res.body).toHaveProperty("status", "success");
            expect(payload).toHaveProperty("sub", user?.id);
        });

        test("Shouldn't create an access token if the email provided doesn't belong to any user", async () => {
            const userProps: UserDTO = {
                ...ROOT_USER,
                email: "wrong_email@email.com"
            };

            const res = await request(app).post("/v1/auth").send({
                email: userProps.email,
                password: userProps.password
            });

            expect(res.status).toEqual(Http.Unauthorized);
            expect(res.body).toHaveProperty("status", "error");
            expect(res.body).toHaveProperty(
                "message",
                "Wrong combination between email and password"
            );
        });

        test("Shouldn't create an access token if the password provided is wrongly provided", async () => {
            const userProps: UserDTO = {
                ...ROOT_USER,
                password: "1337"
            };

            const res = await request(app).post("/v1/auth").send({
                email: userProps.email,
                password: userProps.password
            });

            expect(res.status).toEqual(Http.Unauthorized);
            expect(res.body).toHaveProperty("status", "error");
            expect(res.body).toHaveProperty(
                "message",
                "Wrong combination between email and password"
            );
        });
    });
});
