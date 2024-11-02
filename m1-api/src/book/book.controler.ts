import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './book.entity';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // Route pour obtenir tous les livres
  @Get()
  async findAll(): Promise<Book[]> {
    return await this.bookService.findAll();
  }

  // Route pour obtenir un livre par son ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Book> {
    return await this.bookService.findOne(id);
  }

  // Route pour ajouter un nouveau livre
  @Post()
  async create(@Body() bookData: Partial<Book>): Promise<Book> {
    console.log("Book data:", bookData);
    return await this.bookService.create(bookData);
  }

  // Route pour supprimer un livre par son ID
  @Delete(':id')
  async delete(@Param('id') id: number){
    return await this.bookService.delete(id);
  }
}
