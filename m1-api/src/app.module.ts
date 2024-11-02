import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { BookModule } from './book/book.module';
import { AuthorModule } from './author/author.module';
import { BookController } from './book/book.controler';
import { BookService } from './book/book.service';

@Module({
  imports: [DatabaseModule, BookModule, AuthorModule],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {}
