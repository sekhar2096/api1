export interface ICryptoService {
    encrypt(value: string): Promise<string>;
    decrypt(value: string): Promise<string>;
}
