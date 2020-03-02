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
  user: User;
}
