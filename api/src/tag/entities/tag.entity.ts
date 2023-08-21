import { IsString } from 'class-validator';
import { Post } from 'src/post/entities/post.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 40,
  })
  @IsString()
  name: string;

  @ManyToMany(() => Post, (post) => post.tags)
  @JoinTable()
  posts: Post[];
}
