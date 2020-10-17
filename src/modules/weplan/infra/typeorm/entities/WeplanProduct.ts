import WeplanContractOrderProduct from '@modules/weplan/infra/typeorm/entities/WeplanContractOrderProduct';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('weplan_products')
class WeplanProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  target_audience: string;

  @Column('numeric')
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => WeplanContractOrderProduct, product => product)
  products: WeplanContractOrderProduct;
}

export default WeplanProduct;
