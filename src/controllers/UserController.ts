import { Request, Response } from "express";
import { injectable } from "tsyringe";
import CreateUserService from "../services/CreateUserService";
import ListUsersService from "../services/ListUsersService";
import { Http } from "../utils/constants";
import IController from "./IController";

@injectable()
export default class UserController implements IController {
    public constructor(
        private createUserService: CreateUserService,
        private listUsersService: ListUsersService,
    ) { }

    public async create(req: Request, res: Response): Promise<void> {
        const { name, email, password, level } = req.body;

        const user = await this.createUserService.execute({
            name,
            email,
            password,
            level
        });

        res.status(Http.Created).json({
            status: "success",
            data: { user }
        });
    }

    public async index(req: Request, res: Response): Promise<void> {
        const users = await this.listUsersService.execute();

        res.status(Http.Ok).json({
            status: "success",
            data: { users }
        });
    }
}
