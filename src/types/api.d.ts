import { User } from "./auth";

export interface Token {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export type IdParam = string | string[] | null;
