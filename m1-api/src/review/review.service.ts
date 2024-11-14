import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { Book } from '../book/book.entity';
import { CreateReviewDto } from './dto/review.dto';
import { Author } from 'src/author/author.entity';
import { UpdateReviewDto } from './dto/updateReview.dto';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private reviewRepository: Repository<Review>,
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
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

  private async updateBookAverageRating(bookId: number): Promise<void> {
    // Récupérer le livre 
    const book = await this.bookRepository.findOne({
      where: { id: bookId },
      relations: ['reviews'],
    });
  
    // Vérifie si le livre existe et a des avis
    if (book && book.reviews.length > 0) {
      // Calcule la somme des notes des avis
      const totalRating = book.reviews.reduce((sum, review) => sum + review.rating, 0);
      
      // Calcule la moyenne des notes
      book.rating = totalRating / book.reviews.length;
      
      // Sauvegarde la nouvelle note moyenne
      await this.bookRepository.save(book);
      await this.updateAuthorAverageRating(book.author.id);
    } else if (book) {
      // Si aucun avis n'est présent, on peut mettre la note moyenne à 0
      book.rating = 0;
      await this.bookRepository.save(book);
      await this.updateAuthorAverageRating(book.author.id);
    }
  }

  private async updateAuthorAverageRating(authorId: number): Promise<void> {
    // Récupère l'auteur
    const author = await this.authorRepository.findOne({
      where: { id: authorId },
      relations: ['books', 'books.reviews'], 
    });
  
    if (author && author.books.length > 0) {
      let totalRating = 0;
      let totalReviews = 0;
  
      // Parcours chaque livre et chaque avis pour additionner les notes
      for (const book of author.books) {
        for (const review of book.reviews) {
          totalRating += review.rating;
          totalReviews++;
        }
      }
  
      author.rating = totalReviews > 0 ? totalRating / totalReviews : 0; // Calcule la moyenne des notes de tous les avis

      await this.authorRepository.save(author);
    } else if (author) {
      author.rating = 0; // Auteur sans avis alors set à 0
      await this.authorRepository.save(author);
    }
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
    await this.updateBookAverageRating(book.id);
  
    return review;
  }

  async updateReview(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.reviewRepository.findOne({ where: { id } });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    Object.assign(review, updateReviewDto);

    return this.reviewRepository.save(review);
  }
}
