import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    return await this.bookRepository.findOneBy({ id });
  }

  async create(bookData: Partial<Book>): Promise<Book> {
    const newBook = this.bookRepository.create(bookData);
    return await this.bookRepository.save(newBook);
  }

  async delete(id: number){
    return await this.bookRepository.delete(id).then(() => {});
  }
}
