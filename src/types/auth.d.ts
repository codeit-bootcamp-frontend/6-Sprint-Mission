export interface UserData {
  email: string;
  password: string;
}

export interface UserAccount extends UserData {
  nickname: string;
  passwordConfirmation: string;
}

export interface User {
  id: number;
  email: string;
  image: null | string;
  nickname: string;
  updatedAt: Date;
  createdAt: Date;
}
