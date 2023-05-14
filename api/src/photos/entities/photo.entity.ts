import { IsString, IsUrl, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
  })
  @IsUrl()
  url: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  @IsString()
  @Length(2, 500)
  description: string;

  @Column({
    type: 'varchar',
    length: 30,
  })
  @IsString()
  @Length(1, 30)
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
