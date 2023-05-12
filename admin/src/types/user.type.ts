import { Roles } from '../const/roles.const';

export interface IUser {
  id: string;
  email: string;
  password?: string;
  full_name?: string;
  avatar?: string;
  role: Roles;
}