import { Injectable } from '@nestjs/common';
import { Movement } from '../entity';
import { MovementRepository } from '../repository';

@Injectable()
export class MovementService {
  constructor(private readonly movementRepository: MovementRepository) {}
  async getTrolleyRoutes(): Promise<Movement | undefined> {
    return this.movementRepository.findOne({ id: 1 });
  }
}
