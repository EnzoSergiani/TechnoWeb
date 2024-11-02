import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/createAuthor.dto';
import { UpdateAuthorDto } from './dto/updateAuthor.dto';
import { Author } from './author.entity';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Get()
  async findAll(): Promise<Author[]> {
    return await this.authorService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Author> {
    return await this.authorService.findOne(id);
  }

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    console.log(createAuthorDto);
    return await this.authorService.create(createAuthorDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    return await this.authorService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.authorService.remove(id);
  }
}
