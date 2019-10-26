import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { MovementGeom } from '../model/movement-geom.model';

@Entity('movement')
export class Movement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  agent: string;

  @Column({ type: 'geometry' })
  geom: MovementGeom;

  @Column()
  length: number;

  @Column()
  starttime: Date;

  @Column()
  endtime: Date;

  @Column({ length: 20 })
  start_pos_id: string;

  @Column({ length: 20 })
  end_pos_id: string;
}
