import { compare, hash } from "bcryptjs";
import IHashProvider from "./IHashProvider";

export default class BCryptHashProvider implements IHashProvider {
    public async generateHash(str: string, salt: number): Promise<string> {
        return hash(str, salt);
    }

    public async compare(str: string, hash: string): Promise<boolean> {
        return compare(str, hash);
    }
}
