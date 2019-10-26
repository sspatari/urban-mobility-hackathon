import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RegionGeom } from '../model';

@Entity('chisinau')
export class Region {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'geometry' })
  geom: RegionGeom;

  @Column({ length: 20 })
  name: string;

  @Column()
  population: number;
}
