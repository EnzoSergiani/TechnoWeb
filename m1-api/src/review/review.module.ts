import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/book/book.entity';
import { BookModule } from 'src/book/book.module';
import { ReviewController } from './review.controler';
import { Review } from './review.entity';
import { ReviewService } from './review.service';
import { AuthorModule } from '../author/author.module';

@Module({
    imports: [TypeOrmModule.forFeature([Review, Book]), BookModule, AuthorModule],
    controllers: [ReviewController],
    providers: [ReviewService],
})
export class ReviewModule {}