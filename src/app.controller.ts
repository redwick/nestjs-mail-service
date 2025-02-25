import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getDate(): number {
    return new Date().getTime();
  }
}
