import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { Book } from '../book/book.entity';
import { CreateReviewDto } from './dto/review.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async findAll(bookId: number, sort: 'asc' | 'desc' = 'asc'): Promise<Review[]> {
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }
    
    return await this.reviewRepository.find({
      where: { book: { id: bookId } },
      order: { createdAt: sort === 'asc' ? 'ASC' : 'DESC' },
    });
  }

  async create(bookId: number, createReviewDto: CreateReviewDto): Promise<Review> {
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    const review = this.reviewRepository.create({
      ...createReviewDto,
      book,
    });
    return await this.reviewRepository.save(review);
  }
}
