import { get } from 'http';
import { User } from '../interfaces/User';

class UserService {
  public createAccount(
    userName: string,
    email: string,
    password: string
  ): Promise<User> {
    return new Promise<User>(async (resolve, reject) => {});
  }
}

export default UserService;
