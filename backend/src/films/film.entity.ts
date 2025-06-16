import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ScheduleEntity } from '../schedule/schedule.entity';

@Entity('films')
export class FilmEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'double precision', default: 0, nullable: false })
  rating: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  director: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  tags: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  image: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  cover: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  about: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.film, {
    cascade: true,
  })
  schedule: ScheduleEntity[];
}
