import { IsString, IsOptional } from 'class-validator';

export class UpdateAuthorDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;
}
