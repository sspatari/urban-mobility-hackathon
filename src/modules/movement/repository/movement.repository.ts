import { EntityRepository, Repository } from 'typeorm';
import { Movement } from '../entity';

@EntityRepository(Movement)
export class MovementRepository extends Repository<Movement> {}
