import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class createpotatodto {
  @ApiProperty({ example: 'Potato', description: 'Name of the potato' })
  @IsString({ message: 'Name must be a string' })
  name: string;

  @ApiProperty({ example: 2.5, description: 'Price of the potato' })
  @IsNumber({}, { message: 'Price must be a number' })
  price: number;
}
