import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorController } from './author.controler';
import { Author } from './author.entity';
import { AuthorService } from './author.service';

@Module({
    imports: [TypeOrmModule.forFeature([Author])],
    controllers: [AuthorController],
    providers: [AuthorService],
    exports: [TypeOrmModule, AuthorService],
})
export class AuthorModule {}
