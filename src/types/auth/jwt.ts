export interface JwtPayload {
  id: string;
}

export interface LoginRes {
  accessToken: string;
}

export interface LoginReq {
  email: string;
  password: string;
}

export interface InvalidLoginRes {
  statusCode: number;
  message: string;
}
