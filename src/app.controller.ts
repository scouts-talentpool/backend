import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth/auth.guard';

@Controller()
export class AppController {
  @UseGuards(AuthGuard)
  @Get()
  test() {
    return `Hello Mom!`;
  }
}
