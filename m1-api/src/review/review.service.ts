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
    } else if (book) {
      // Si aucun avis n'est présent, on peut mettre la note moyenne à 0
      book.rating = 0;
      await this.bookRepository.save(book);
    }
  }

  async create(bookId: number, createReviewDto: CreateReviewDto): Promise<Review> {
    const { rating, comment } = createReviewDto;
  
    // Récupère le livre pour lequel l'avis est ajouté
    const book = await this.bookRepository.findOne({ where: { id: bookId } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }
  
    // Crée et enregistre l'avis
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
}
