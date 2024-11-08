import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from "../book/book.entity"

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  profilePicture?: string; 

  @Column({nullable: true})
  numberOfBooks: number;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];

  @Column('float', { nullable: true })
  rating: number; 

  @Column({ nullable: true})
  description: string;
}
