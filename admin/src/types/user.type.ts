import { Roles } from '../const/roles.const';

export interface IUser {
  id: string;
  email: string;
  full_name?: string;
  avatar?: string;
  role?: Roles;
}

export interface IUserResponse {
  id: string;
  email: string;
  full_name: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}