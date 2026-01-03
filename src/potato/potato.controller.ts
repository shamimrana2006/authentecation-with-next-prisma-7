import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { PotatoService } from './potato.service';
import { createpotatodto } from './dto/create.dto';

@ApiTags('potato')
@Controller('potato')
export class PotatoController {
  constructor(private readonly potatoservice: PotatoService) {}

  @Post()
  async createPtato(@Body() potatoData: createpotatodto) {
    console.log('potato data ++++++++++++++++', potatoData);

    return await this.potatoservice.createPotato(potatoData);
  }

  @ApiOperation({summary:'get all potatos', description:'this api is use to get all potatos'})
  @Get('all_Potatos')
  async getAllPotatoes() {
    return await this.potatoservice.GEtallPotatoes();
  }
}
