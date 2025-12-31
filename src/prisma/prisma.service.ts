import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from 'prisma/client';
import { Pool } from 'pg';

@Injectable()
export class PrismaService implements OnModuleInit {
  private readonly prisma: PrismaClient;
  constructor() {
    console.log('DATABASE_URL:', process.env.DATABASE_URL);

    const pool = new Pool({
      connectionString: process.env.DATABASE_URL,
    });

    const adapter = new PrismaPg(pool);

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

  get client() {
    return this.prisma;
  }
}
