import { Request, Response } from "express";
import { injectable } from "tsyringe";
import AuthenticateUserService from "../services/AuthenticateUserService";
import { Http } from "../utils/constants";
import IController from "./IController";

@injectable()
export default class AuthController implements IController {
    public constructor(
        private autheticateUserService: AuthenticateUserService
    ) {}

    public async create(req: Request, res: Response): Promise<void> {
        const { email, password } = req.body;

        const accessToken = await this.autheticateUserService.execute({
            email,
            password
        });

        res.status(Http.Ok).json({ status: "success", data: { accessToken } });
    }
}
