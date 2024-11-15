import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorModule } from 'src/author/author.module';
import { BookController } from './book.controler';
import { Book } from './book.entity';
import { BookService } from './book.service';

@Module({
  imports: [TypeOrmModule.forFeature([Book]), forwardRef(() => AuthorModule)],
  controllers: [BookController],
  providers: [BookService],
  exports: [TypeOrmModule, BookService],
})
export class BookModule {}
