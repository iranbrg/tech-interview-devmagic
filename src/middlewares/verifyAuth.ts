import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import IJWTProvider from "../providers/JWTProvider/IJWTProvider";
import { Http } from "../utils/constants";
import { AuthError } from "../utils/errors";

export default async function verifyAuth(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw new AuthError("Access token's missing");

    const [, token] = authHeader.split(" ");

    const jwtProvider: IJWTProvider = container.resolve("JWTProvider");

    try {
        const payload = await jwtProvider.verifySecretKey(token);

        const { sub: id } = payload;

        req.user = { id };

        next();
    } catch (err) {
        throw new AuthError((err as Error).message, Http.Forbidden);
    }
}
