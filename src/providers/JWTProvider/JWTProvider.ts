import { sign, verify } from "jsonwebtoken";
import { injectable } from "tsyringe";
import IJWTProvider, { JWTPayload } from "./IJWTProvider";
import authConfig from "../../config/auth";

@injectable()
export default class JWTProvider implements IJWTProvider {
    public generateAccessToken(payload: JWTPayload): Promise<string> {
        return new Promise((resolve, reject) => {
            const { jwtSecretKey, exp, iss } = authConfig;

            sign(
                { ...payload, iss },
                jwtSecretKey,
                { expiresIn: exp },
                (err, token) => {
                    if (err) reject(err);
                    resolve(token as string);
                }
            );
        });
    }

    public async verifySecretKey(token: string): Promise<JWTPayload> {
        return new Promise((resolve, reject) => {
            const { jwtSecretKey } = authConfig;

            verify(token, jwtSecretKey, (err, decodedPayload) => {
                if (err) reject(err);
                resolve(decodedPayload as JWTPayload);
            });
        });
    }
}
