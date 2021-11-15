import UserDTO from "../../src/dto/UserDTO";
import FakeUserRepository from "../../src/repositories/UserRepository/FakeUserRepository";
import IUserRepository from "../../src/repositories/UserRepository/IUserRepository";
import CreateUserService from "../../src/services/CreateUserService";
import { ApiError } from "../../src/utils/errors";

describe("CreateUserService", () => {
    let contactRepository: IUserRepository;
    let createUserService: CreateUserService;

    beforeEach(() => {
        contactRepository = new FakeUserRepository();
        createUserService = new CreateUserService(contactRepository);
    });

    test("Should create a new contact", async () => {
        const contactProps: UserDTO = {
            name: "John",
            email: "john@email.com",
            password: "1337",
            level: 1
        };

        const contact = await createUserService.execute(contactProps);

        expect(contact).toHaveProperty("id");
        expect(contact).toMatchObject(contactProps);
    });

    test("Shouldn't create a contact with a phone number already registered", async () => {
        const contactProps: UserDTO = {
            name: "John",
            email: "Doe",
            password: "1337",
            level: 1
        };

        await createUserService.execute(contactProps);

        await expect(
            createUserService.execute(contactProps)
        ).rejects.toEqual(new ApiError("Phone number already registered"));
    });
});
