interface User {
  readonly id: string;
  userName: string;
  email: string;
  password?: string;
  access_token?: string;
  refresh_token?: string;
}

export { User };
