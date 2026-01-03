import { Module } from '@nestjs/common';
import { PotatoService } from './potato.service';
import { PotatoController } from './potato.controller';

@Module({
  providers: [PotatoService],
  controllers: [PotatoController]
})
export class PotatoModule {}
