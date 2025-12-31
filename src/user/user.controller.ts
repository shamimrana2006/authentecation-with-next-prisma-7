import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiQuery({ name: 'email', required: true, type: String, description: 'User email address', example: 'john@example.com' })
  @ApiQuery({ name: 'name', required: true, type: String, description: 'Full name of the user', example: 'John Doe' })
  @ApiQuery({ name: 'password', required: true, type: String, description: 'User password (min 6 characters)', example: 'password123' })
  @ApiQuery({ name: 'phone', required: false, type: String, description: 'Phone number', example: '+1234567890' })
  @ApiQuery({ name: 'address', required: false, type: String, description: 'Street address', example: '123 Main St' })
  @ApiQuery({ name: 'city', required: false, type: String, description: 'City', example: 'New York' })
  @ApiQuery({ name: 'state', required: false, type: String, description: 'State/Province', example: 'NY' })
  @ApiQuery({ name: 'country', required: false, type: String, description: 'Country', example: 'USA' })
  @ApiQuery({ name: 'zipCode', required: false, type: String, description: 'Zip/Postal code', example: '10001' })
  @ApiQuery({ name: 'avatar', required: false, type: String, description: 'User profile picture URL', example: 'https://example.com/avatar.jpg' })
  create(@Query() query: CreateUserDto) {
    return this.userService.create(query);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
