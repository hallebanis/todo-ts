import { User } from '../interfaces/User';
class UserModel implements User {
  readonly id: string;
  email: string;
  password: string;
  userName: string;
  constructor(id: string, email: string, password: string, userName: string) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.userName = userName;
  }
}

export default UserModel;
