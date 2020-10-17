import WeplanProduct from '@modules/suppliers/infra/typeorm/entities/WeplanProduct';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import WeplanContractOrder from './WeplanContractOrder';

@Entity('weplan_contract_order_products')
class WeplanContractOrderProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  contract_order_id: string;

  @ManyToOne(() => WeplanContractOrder)
  @JoinColumn({ name: 'contract_order_id' })
  weplanContractOrder: WeplanContractOrder;

  @Column('uuid')
  weplan_product_id: string;

  @ManyToOne(() => WeplanProduct, { eager: true })
  @JoinColumn({ name: 'weplan_product_id' })
  weplanProduct: WeplanProduct;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column('integer')
  quantity: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default WeplanContractOrderProduct;
