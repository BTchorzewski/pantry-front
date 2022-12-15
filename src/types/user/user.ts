export interface UserForLogin {
  id: string;
  email: string;
  password: string;
}

export interface LoggedUser extends UserForLogin {
  token: string;
}
