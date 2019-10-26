import { EntityRepository, Repository } from 'typeorm';
import { Region } from '../entity';

@EntityRepository(Region)
export class RegionRepository extends Repository<Region> {}
