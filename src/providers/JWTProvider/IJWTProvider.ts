export interface JWTPayload {
    [k: string]: string;
}

export default interface IJWTProvider {
    generateAccessToken(payload: JWTPayload): Promise<string>;
    verifySecretKey(token: string): Promise<JWTPayload>;
}
