export interface UserRegistrationReq {
  email: string;
  password: string;
}

export interface UserRegistrationRes {
  message: string;
  userId?: string;
}
