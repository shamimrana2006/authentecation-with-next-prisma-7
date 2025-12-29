import { Global, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'prisma/client';

@Global()
@Injectable()
export class PrismaService implements OnModuleInit {
  private readonly prisma: PrismaClient;
  constructor() {
    const adapter = new PrismaPg({
      connectionString: process.env.DATABASE_URL,
    });

    this.prisma = new PrismaClient({
      adapter,
    });
  }
  async onModuleInit() {
    try {
      await this.prisma.$connect();
      console.log('database connected');
    } catch (error) {
      console.log('database connection failed', error);
    }
  }
}
