import { IsBoolean, IsString, IsUrl } from 'class-validator';
import { Tag } from 'src/tag/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 4000,
  })
  @IsString()
  content: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  @IsUrl()
  cover: string;

  @Column({
    type: 'varchar',
    length: 500,
  })
  @IsString()
  description: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  @IsBoolean()
  is_private: boolean;

  @Column({
    type: 'varchar',
    length: 200,
  })
  @IsString()
  subtitle: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @ManyToMany(() => Tag, (tag) => tag.posts)
  tags: Tag[];
}
