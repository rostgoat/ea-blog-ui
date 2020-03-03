export interface User {
  email: string;
  username: string;
  token: string;
}

export interface UserSubmit {
  username: string;
  password: string;
}

export interface UserReponse {
  username: string;
  token: string;
  email: string;
  name: string;
}
