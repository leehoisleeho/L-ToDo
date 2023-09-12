import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('todolist')
export class Todolist {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  userid: number;
  @Column()
  title: string;
  @Column()
  content: string;
  @Column()
  time: string;
  @Column({ default: 0 })
  urgentState: number;
  @Column({ default: 0 })
  starState: number;
}