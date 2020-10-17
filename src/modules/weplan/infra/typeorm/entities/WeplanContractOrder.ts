import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import WeplanContractOrderProduct from './WeplanContractOrderProduct';

@Entity('weplan_contract_orders')
class WeplanContractOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  customer: User;

  @OneToMany(
    () => WeplanContractOrderProduct,
    weplanContractOrder => weplanContractOrder.weplanContractOrder,
    {
      cascade: true,
      eager: true,
    },
  )
  products: WeplanContractOrderProduct[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default WeplanContractOrder;
