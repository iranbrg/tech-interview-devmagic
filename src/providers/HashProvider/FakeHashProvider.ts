import IHashProvider from "./IHashProvider";

export default class FakeHashProvider implements IHashProvider {
    public async generateHash(str: string, salt: number): Promise<string> {
        return `${str}-${salt}`;
    }

    public async compare(str: string, hash: string): Promise<boolean> {
        const [s, _] = hash.split("-");

        if (s === str) return true;

        return false;
    }
}
