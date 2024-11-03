import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Book } from '../book/book.entity';
  
@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', width: 1 })
  rating: number; // Entre 1 et 5 étoiles

  @Column({ type: 'text', nullable: true })
  comment: string;

  @CreateDateColumn()
  createdAt: Date;

  // Relation Many-to-One avec Book
  @ManyToOne(() => Book, (book) => book.reviews, { onDelete: 'CASCADE' })
  book: Book;
}
  