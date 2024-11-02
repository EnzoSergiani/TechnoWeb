import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Author } from '../author/author.entity';
import { IsNotEmpty, isNotEmpty } from 'class-validator';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  writtenDate: Date;

  @ManyToOne(() => Author, (author) => author.books, { eager: true })
  author: Author;

  @Column('float', { nullable: true })
  averageRating: number;
}
