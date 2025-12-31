import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const result = await this.prisma.client.user.create({
        data: createUserDto,
      });

      console.log(result);
      return 'user create successfully';
    } catch (error) {
      
      console.log("========================error: =================",error);
      return 'failed to create user';
    }
  }

  findAll() {
    return `This action returns all user`;
  } 

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
