import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { createpotatodto } from './dto/create.dto';

@Injectable()
export class PotatoService {
  constructor(private readonly prisma: PrismaService) {}

  async createPotato(potatoCreateData: createpotatodto) {
    try {
      console.log('ami service theke bochi :', potatoCreateData);

      const result = await this.prisma.client.potato.create({
        data: potatoCreateData,
      });

      return {
        message: 'success',
        result,
      };
    } catch (error) {
      return {
        message: 'failed',
        error,
      };
    }
  }

// get all potatoes

  async GEtallPotatoes(){
    return await this.prisma.client.potato.findMany();
  }
}
