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

  @IsOptional()
  @IsString()
  description?: string;

  @IsObject()
  author: {
    id: number;
    name?: string;
    profilePicture?: string;
  };
}