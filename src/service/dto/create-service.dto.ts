import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsString } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({example: 'Web Development'})
  @IsString({ message: 'Title must be a string' })
  title: string;

  @ApiProperty({example: 'Professional web development services'})
  @IsString({ message: 'Description must be a string' })
  description: string;

  @ApiProperty({example: 500,type: 'number'})
  @Type(() => Number)
  @IsNumber({},{message: 'Price must be a number'})
  price: number;

  @ApiProperty({ example: 1, type: 'number' })
  @Type(() => Number)
  @IsInt({ message: 'userId must be an integer' })
  userId: number;
}
