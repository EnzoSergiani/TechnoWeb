import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/author/author.entity';
import { Book } from 'src/book/book.entity';
import { Review } from 'src/review/review.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.db',
      entities: [Author, Book, Review],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
