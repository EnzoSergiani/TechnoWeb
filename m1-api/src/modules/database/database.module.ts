import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from 'src/author/author.entity';
import { Book } from 'src/book/book.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db',
      entities: [Author, Book],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
