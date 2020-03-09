export interface User {
  email: string;
  username: string;
  token: string;
}

export interface UserSubmitLogin {
  username: string;
  password: string;
}

export interface UserSubmitRegister {
  name: string;
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
}

export interface UserReponse {
  username: string;
  token: string;
  email: string;
  name: string;
}
