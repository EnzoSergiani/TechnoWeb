import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/author/author.entity';
import { AuthorService } from 'src/author/author.service';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/book.dto';
import { UpdateBookDto } from './dto/updateBook.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,

    @InjectRepository(Author)
    private authorRepository: Repository<Author>,

    private authorService: AuthorService,
  ) {}

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    return await this.bookRepository.findOneBy({ id });
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { title, price, publicationYear, coverPhoto, author } = createBookDto;

    // Recherche de l'auteur dans la base de données
    const authorEntity = await this.authorRepository.findOne({ where: { id: author.id } });

    if (!authorEntity) {
      throw new NotFoundException(`Author with ID ${author.id} not found`);
    }

    const book = this.bookRepository.create({
      title,
      price,
      publicationYear,
      coverPhoto,
      author: authorEntity,
    });

    await this.authorService.incrementBookCount(author.id);

    return this.bookRepository.save(book);
  }

  async updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    const previousAuthor : Author = book.author;

    Object.assign(book, updateBookDto);

    return this.bookRepository.save(book);
  }

  async delete(id: number){

    const book = await this.bookRepository.findOne({
      where: { id: id },
      relations: ['author'],
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    // Supprimez le livre
    await this.bookRepository.remove(book);

    await this.authorService.updateAuthorAverageRating(book.author.id);

    // Décrémentez le nombre de livres de l'auteur
    await this.authorService.decrementBookCount(book.author.id);
  }
  
  async updateBookAverageRating(bookId: number): Promise<void> {
    const book = await this.bookRepository.findOne({
      where: { id: bookId },
      relations: ['reviews'],
    });

    if (!book) {
      throw new NotFoundException(`Book with ID ${bookId} not found`);
    }

    const averageRating = book.reviews.length
      ? book.reviews.reduce((acc, review) => acc + review.rating, 0) / book.reviews.length
      : 0;

    book.rating = averageRating;
    await this.bookRepository.save(book);

    // mise à jour de l'auteur aussi
    await this.authorService.updateAuthorAverageRating(book.author.id);
  }
}
