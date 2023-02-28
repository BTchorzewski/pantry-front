export interface JwtPayload {
  id: string;
  login: string;
  iat: number;
  exp: number;
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
