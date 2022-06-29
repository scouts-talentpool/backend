// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Lehrberuf } from '@prisma/client';
import { LehrberufService } from './lehrberuf.service';

@Controller('lehrberufe')
export class LehrberufController {
  constructor(private readonly lehrberufService: LehrberufService) {}

  @Post()
  async create(@Body() lehrberuf: Lehrberuf) {
    return await this.lehrberufService.create(lehrberuf);
  }

  @Get()
  async findAll() {
    return await this.lehrberufService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.lehrberufService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLehrberufDto: UpdateLehrberufDto) {
  //   return this.lehrberufService.update(+id, updateLehrberufDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.lehrberufService.remove(+id);
  // }
}
