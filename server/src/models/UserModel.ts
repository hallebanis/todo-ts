import { User } from '../interfaces/User';
class UserModel implements User {
  readonly id: string;
  email: string;
  password?: string;
  userName: string;
  access_token?: string;
  refresh_token?: string;
  constructor(input: {
    id: string;
    email: string;
    password?: string;
    userName: string;
    access_token: string | undefined;
    refresh_token: string | undefined;
  }) {
    this.id = input.id;
    this.email = input.email;
    if (input.password) this.password = input.password;
    this.userName = input.userName;
    if (input.access_token) this.access_token = input.access_token;
    if (input.refresh_token) this.refresh_token = input.refresh_token;
  }
  getUserBasicData(): { userName: string; email: string; id: string } {
    return {
      userName: this.userName,
      email: this.email,
      id: this.id,
    };
  }
}

export default UserModel;
