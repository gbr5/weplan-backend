import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import CustomerServiceOrder from './CustomerServiceOrder';

@Entity('card_customer_service_orders')
class CardCustomerServiceOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  customer_service_order_id: string;

  @ManyToOne(
    () => CustomerServiceOrder,
    serviceOrder => serviceOrder.customerServiceOrderCards,
    // { eager: true },
  )
  @JoinColumn({ name: 'customer_service_order_id' })
  cardCustomerServiceOrder: CustomerServiceOrder;

  @Column()
  card_unique_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default CardCustomerServiceOrder;
