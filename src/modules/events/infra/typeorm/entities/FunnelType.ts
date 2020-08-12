import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';
// import FunnelTypeSupplier from './FunnelTypeSupplier';
// import Event from './Event';

@Entity('funnel_types')
class FunnelTypes {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // @OneToMany(() => Event, event => event.event_type)
  // events: Event;

  // @OneToMany(
  //   () => FunnelTypeSupplier,
  //   funnel_type_supplier => funnel_type_supplier.funnel_type,
  // )
  // funnel_type_suppliers: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default FunnelTypes;
