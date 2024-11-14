import { IsOptional, IsString, IsNumber, IsObject } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNumber()
  publicationYear?: number;

  @IsOptional()
  @IsString()
  coverPhoto?: string;

  @IsOptional()
  @IsObject()
  author: {
    id: number;
  };
}