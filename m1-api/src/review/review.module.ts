import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from 'src/book/book.entity';
import { BookModule } from 'src/book/book.module';
import { ReviewController } from './review.controler';
import { Review } from './review.entity';
import { ReviewService } from './review.service';

@Module({
    imports: [TypeOrmModule.forFeature([Review, Book]), BookModule],
    controllers: [ReviewController],
    providers: [ReviewService]
})
export class ReviewModule {}