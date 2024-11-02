import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from './book.controler';
import { Book } from './book.entity';
import { BookService } from './book.service';

@Module({
    imports: [TypeOrmModule.forFeature([Book])],
    controllers: [BookController],
    providers: [BookService],
    exports: [TypeOrmModule],
})
export class BookModule {}
