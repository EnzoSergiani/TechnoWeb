import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from 'src/author/author.entity';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private bookRepository: Repository<Book>,

    @InjectRepository(Author)
    private authorRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  async findOne(id: number): Promise<Book> {
    return await this.bookRepository.findOneBy({ id });
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { title, price, publicationYear, author } = createBookDto;

    // Recherche de l'auteur dans la base de données
    const authorEntity = await this.authorRepository.findOne({ where: { id: author.id } });

    if (!authorEntity) {
      throw new NotFoundException(`Author with ID ${author.id} not found`);
    }

    const book = this.bookRepository.create({
      title,
      price,
      publicationYear,
      author: authorEntity,
    });

    authorEntity.numberOfBooks += 1;
    await this.authorRepository.save(authorEntity);
    return this.bookRepository.save(book);
  }

  async delete(id: number){
    const bookEntity = await this.bookRepository.findOne({where : {id: id}});
    const authorEntity = await this.authorRepository.findOne({ where: { id: bookEntity.author.id } });

    if (!bookEntity) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    if (!authorEntity) {
      throw new NotFoundException(`Author with ID ${bookEntity.author.id} not found`);
    }

    authorEntity.numberOfBooks -=1;
    await this.authorRepository.save(authorEntity);
    
    return await this.bookRepository.delete(id).then(() => {});
  }
  
}
