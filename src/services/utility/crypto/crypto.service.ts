// tslint:disable-next-line:no-require-imports
import crypto = require('crypto');
import { bcrypt } from '../../../external';
import { ICryptoService } from '../../';
import { CryptoConfig } from './crypto.config';

export class CryptoService implements ICryptoService {

    async encrypt(value: string): Promise<string> {
        let key = CryptoConfig.key;
        const cipher = crypto.createCipher(CryptoConfig.algorithm, CryptoConfig.key);
        let encryptedValue = cipher.update(value, 'utf8', 'hex');
        encryptedValue += cipher.final('hex');

        return await encryptedValue;

    }

    async decrypt(value: string): Promise<string> {
        let key = CryptoConfig.key;
        const decipher = crypto.createDecipher(CryptoConfig.algorithm, CryptoConfig.key);
        let decryptedValue = decipher.update(value, 'hex', 'utf8');
        decryptedValue += decipher.final('utf8');

        return await decryptedValue;
    }

    static getInstance(): CryptoService {
        return new CryptoService();
    }
}
