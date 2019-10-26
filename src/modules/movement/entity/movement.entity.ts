import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movement')
export class Movement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 20 })
  agent: string;

  @Column()
  geom: string;

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
