import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/book/book.entity';
import { Repository } from 'typeorm';
import { Author } from './author.entity';
import { CreateAuthorDto } from './dto/createAuthor.dto';
import { UpdateAuthorDto } from './dto/updateAuthor.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepository: Repository<Author>,

    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Author[]> {
    return await this.authorRepository.find({ relations: ['books'] });
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: ['books'],
    });
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorRepository.create(createAuthorDto);
    return await this.authorRepository.save(author);
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    await this.authorRepository.update(id, updateAuthorDto);
    const updatedAuthor = await this.findOne(id);
    if (!updatedAuthor) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return updatedAuthor;
  }

  async remove(id: number): Promise<void> {
    const result = await this.authorRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
  }

  async incrementBookCount(id: number): Promise<void> {
    await this.authorRepository.increment({ id: id }, 'numberOfBooks', 1);
  }

  async decrementBookCount(id: number): Promise<void> {
    await this.authorRepository.decrement({ id: id }, 'numberOfBooks', 1);
  }

  async updateAuthorAverageRating(authorId: number): Promise<void> {
    const author = await this.authorRepository.findOne({
      where: { id: authorId },
      relations: ['books'],
    });

    if (!author) {
      throw new NotFoundException(`Author with ID ${authorId} not found`);
    }

    const books = await this.bookRepository.find({
      where: { author: { id: authorId } },
      relations: ['reviews'],
    });

    const totalRatings = books.reduce(
      (sum, book) => sum + (book.rating || 0),
      0,
    );
    const averageRating = books.length ? totalRatings / books.length : 0;

    author.rating = averageRating;
    await this.authorRepository.save(author);
  }
}
