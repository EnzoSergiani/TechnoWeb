import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { Book } from '../book/book.entity';
import { CreateReviewDto } from './dto/review.dto';
import { Author } from 'src/author/author.entity';
import { UpdateReviewDto } from './dto/updateReview.dto';
import { BookService } from 'src/book/book.service';
import { AuthorService } from 'src/author/author.service';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
    @Inject(forwardRef(() => BookService))
    private bookService: BookService,
    @Inject(forwardRef(() => AuthorService))
    private authorService: AuthorService,
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
    const { rating, comment } = createReviewDto;
  
    // Récupère le livre
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }
  
    const review = this.reviewRepository.create({
      rating,
      comment,
      book,
    });
    await this.reviewRepository.save(review);
  
    // Met à jour la note moyenne du livre
    await this.bookService.updateBookAverageRating(book.id);
  
    return review;
  }

  async updateReview(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { id }, relations: ['book', 'book.author'], });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    Object.assign(review, updateReviewDto);

    await this.reviewRepository.save(review);

    await this.bookService.updateBookAverageRating(review.book.id);

    return review;
  }

  async deleteReview(id: number): Promise<void> {
    const review = await this.reviewRepository.findOne({
      where: { id: id },
      relations: ['book', 'book.author'],
    });
    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    await this.reviewRepository.remove(review);

    return this.bookService.updateBookAverageRating(review.book.id);
  }
}
