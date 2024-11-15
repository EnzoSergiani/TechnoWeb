import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Author } from '../author/author.entity';
import { IsNotEmpty } from 'class-validator';
import { Review } from 'src/review/review.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  title: string;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  price: number;

  @Column()
  publicationYear: number;

  @Column('float', { nullable: true })
  rating: number;

  @Column({ nullable: true })
  coverPhoto: string;

  @Column({ nullable: true })
  description: string;

  // Un livre n'a qu'un auteur
  @ManyToOne(() => Author, (author) => author.books, {
    eager: true,
    onDelete: 'CASCADE',
  })
  author: Author;

  // Un livre est relié à plusieur avis
  @OneToMany(() => Review, (review) => review.book, { cascade: true })
  reviews: Review[];
}
