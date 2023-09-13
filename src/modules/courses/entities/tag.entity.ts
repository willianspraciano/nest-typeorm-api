import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import { Course } from './course.entity';

@Entity('tags')
export class Tag {
  constructor() {
    if (this.id) return;
    this.id = uuidv4();
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToMany(() => Course, (course) => course.tags)
  courses: Course[];
}
