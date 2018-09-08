import { ILoginService, ICryptoService, CryptoService, IEncryptService, EncryptService } from './';
import { IAccountRepository, AccountRepository } from '../repositories';
import { User } from '../entities';

export class LoginService implements ILoginService {

    private accountRepository: IAccountRepository;
    private cryptoService: ICryptoService;
    private encryptService: IEncryptService;

    async login(user: User): Promise<User> {
        let result = await this.accountRepository.login(user);
        let isPasswordMatched: boolean = false;
        if (result != null) {
            isPasswordMatched = await this.encryptService.compare(user.password, result.password);
            if (isPasswordMatched) {
                result.phoneNumber = await this.cryptoService.decrypt(result.phoneNumber);

                return result;
            }
        }

        return null;
    }

    static getInstance(): LoginService {
        const loginService = new LoginService();
        loginService.accountRepository = AccountRepository.getInstance();
        loginService.cryptoService = CryptoService.getInstance();
        loginService.encryptService = EncryptService.getInstance();

        return loginService;
    }
}
