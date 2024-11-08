import { IsString, IsNumber, IsOptional, IsObject } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsNumber()
  price: number;

  @IsNumber()
  publicationYear: number;

  @IsString()
  coverPhoto: string;

  @IsObject()
  author: {
    id: number;
    name?: string;
    profilePicture?: string;
  };
}