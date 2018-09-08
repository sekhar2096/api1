import { User } from '../entities';

export interface ILoginService {
    login(user: User): Promise<User>;
}
