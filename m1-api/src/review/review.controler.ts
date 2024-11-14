import { Controller, Get, Post, Body, Param, Query, Patch } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/review.dto';
import { Review } from './review.entity';
import { UpdateReviewDto } from './dto/updateReview.dto';

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

  @Patch(':id')
  async updateReview(@Param('id') id: number, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.updateReview(id, updateReviewDto);
  }
}

