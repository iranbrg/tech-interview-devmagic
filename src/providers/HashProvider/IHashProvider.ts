export default interface IHashProvider {
    generateHash(str: string, salt: number): Promise<string>;
    compare(str: string, hash: string): Promise<boolean>;
}
