import { UserRole } from 'src/const/role.const';

export class CreateUserDto {
  email: string;
  password: string;
  full_name?: string;
  avatar?: string;
  role?: UserRole;
}
