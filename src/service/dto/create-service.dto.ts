import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, isString, IsString } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({example: 'Web Development'})
  @IsString({ message: 'Title must be a string' })
  tilte: string;

  @ApiProperty({example: 'Professional web development services'})
  @IsString({ message: 'Description must be a string' })
  description: string;

  @ApiProperty({example: 500,type: 'number'})
  @IsNumber({},{message: 'Price must be a number'})
  price: number;

  @ApiProperty({example: 'user_12345'})
  @IsString({ message: 'UserID must be a string' })
  userID: string;
}
