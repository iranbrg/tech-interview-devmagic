import request from "supertest";
import app from "../../src/app";
import db from "../../src/database";
import UserDTO from "../../src/dto/UserDTO";
import { Http, ROOT_USER } from "../../src/utils/constants";

describe("UserController", () => {
    beforeAll(async () => {
        await db.connect();
    });

    beforeEach(async () => {
        await db.truncate();
    });

    afterAll(async () => {
        await db.close();
    });

    describe("POST /v1/users", () => {
        test("Should create a new contact", async () => {
            const contactProps: UserDTO = {
                name: "John",
                email: "Doe",
                password: "1337",
                level: 1
            };

            const authRes = await request(app).post("/v1/auth").send({
                email: ROOT_USER.email,
                password: ROOT_USER.password
            });

            const { accessToken } = authRes.body.data;

            const res = await request(app)
                .post("/v1/contacts")
                .send(contactProps)
                .auth(accessToken, { type: "bearer" });

            const { contact } = res.body.data;

            expect(res.status).toEqual(Http.Created);
            expect(res.body).toHaveProperty("status", "success");
            expect(contact).toMatchObject(contactProps);
        });

        test("Shouldn't create a new contact whith a phone number already registered", async () => {
            const contactProps1: UserDTO = {
                name: "John",
                email: "Doe",
                password: "1337",
                level: 1
            };

            const contactProps2: UserDTO = {
                name: "John",
                email: "Doe",
                password: "1337",
                level: 1
            };

            const authRes = await request(app).post("/v1/auth").send({
                email: ROOT_USER.email,
                password: ROOT_USER.password
            });

            const { accessToken } = authRes.body.data;

            await request(app)
                .post("/v1/contacts")
                .send(contactProps1)
                .auth(accessToken, { type: "bearer" });

            const res = await request(app)
                .post("/v1/contacts")
                .send(contactProps2)
                .auth(accessToken, { type: "bearer" });

            expect(res.status).toEqual(Http.BadRequest);
            expect(res.body).toHaveProperty("status", "error");
            expect(res.body).toHaveProperty(
                "message",
                "Phone number already registered"
            );
        });
    });
});
