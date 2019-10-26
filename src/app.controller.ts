import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('trolley/routes')
  getTrolleyRoutes(): string {
    return this.appService.getTrolleyRoutes();
  }
}
