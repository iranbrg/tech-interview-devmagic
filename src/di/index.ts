import { container } from "tsyringe";

import IUserRepository from "../repositories/UserRepository/IUserRepository";
// import PrismaUserRepository from "../repositories/UserRepository/PrismaUserRepository";
import PgUserRepository from "../repositories/UserRepository/PgUserRepository";

import IJWTProvider from "../providers/JWTProvider/IJWTProvider";
import JWTProvider from "../providers/JWTProvider/JWTProvider";
import IHashProvider from "../providers/HashProvider/IHashProvider";
import BCryptHashProvider from "../providers/HashProvider/BCryptHashProvider";

container.registerSingleton<IUserRepository>(
    "UserRepository",
    // PrismaUserRepository
    PgUserRepository
);

container.registerSingleton<IJWTProvider>("JWTProvider", JWTProvider);
container.registerSingleton<IHashProvider>("HashProvider", BCryptHashProvider);
