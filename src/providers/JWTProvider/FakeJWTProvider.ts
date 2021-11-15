import { IJWTProvider, JWTPayload } from "./IJWTProvider";

export default class FakeJWTProvider implements IJWTProvider {
    public generateAccessToken(payload: JWTPayload): Promise<string> {
        return Promise.resolve(JSON.stringify(payload));
    }

    public async verifySecretKey(token: string): Promise<JWTPayload> {
        return Promise.resolve(JSON.parse(token));
    }
}
