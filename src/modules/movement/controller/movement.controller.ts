import { Controller, Get } from '@nestjs/common';
import { Movement } from '../entity';
import { MovementService } from '../service';

@Controller()
export class MovementController {
  constructor(private readonly movementService: MovementService) {}

  @Get('trolley/routes')
  async getTrolleyRoutes(): Promise<Movement | undefined> {
    return this.movementService.getTrolleyRoutes();
  }
}
