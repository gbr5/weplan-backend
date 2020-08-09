import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('event_types')
class EventTypes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
}

export default EventTypes;
