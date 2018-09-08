import { bcrypt } from '../../../external';
import { IEncryptService } from '../../';
import { CryptoConfig } from './crypto.config';

export class EncryptService implements IEncryptService {

    async encrypt(value: string): Promise<string> {
        return await bcrypt.hashSync(value, CryptoConfig.salt);
    }

    async compare(value: string, encryptedValue: string): Promise<boolean> {
        return await bcrypt.compareSync(value, encryptedValue);
    }

    static getInstance(): EncryptService {
        return new EncryptService();
    }
}
