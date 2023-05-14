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
    nullable: true,
  })
  @IsString()
  @Length(2, 30)
  full_name: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  @IsUrl()
  avatar: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER,
  })
  roles: UserRole;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
