import { IsEmail, IsString, IsUrl, Length } from 'class-validator';
import { UserRole } from 'src/const/role.const';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column({
    type: 'varchar',
  })
  @IsString()
  @Length(2, 30)
  full_name: string;

  @Column({
    type: 'varchar',
  })
  @IsUrl()
  avatar: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  role: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
