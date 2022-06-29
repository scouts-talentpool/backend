// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Lehrstelle } from '@prisma/client';
import { LehrstelleService } from './lehrstelle.service';

@Controller('lehrstellen')
export class LehrstelleController {
  constructor(private readonly lehrstelleService: LehrstelleService) {}

  @Post()
  async create(@Body() lehrstelle: Lehrstelle) {
    return await this.lehrstelleService.create(lehrstelle);
  }

  @Get()
  async findAll() {
    return await this.lehrstelleService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.lehrstelleService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLehrstelleDto: UpdateLehrstelleDto) {
  //   return this.lehrstelleService.update(+id, updateLehrstelleDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.lehrstelleService.remove(+id);
  // }
}
