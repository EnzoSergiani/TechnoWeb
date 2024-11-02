import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/review.dto';
import { Review } from './review.entity';

@Controller('books/:bookId/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get()
  async findAll(
    @Param('bookId') bookId: number,
    @Query('sort') sort?: 'asc' | 'desc',
  ): Promise<Review[]> {
    return await this.reviewService.findAll(bookId, sort);
  }

  @Post()
  async create(
    @Param('bookId') bookId: number,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<Review> {
    return await this.reviewService.create(bookId, createReviewDto);
  }
}
