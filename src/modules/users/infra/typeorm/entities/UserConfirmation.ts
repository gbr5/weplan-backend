import CompanyEmployee from '@modules/suppliers/infra/typeorm/entities/CompanyEmployee';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('user_confirmations')
class UserConfirmation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  sender_id: string;

  @Column('uuid')
  receiver_id: string;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column('boolean')
  isConfirmed: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => CompanyEmployee, employee => employee.id)
  @JoinColumn({ name: 'receiver_id' })
  employeeReceiver: CompanyEmployee;
}

export default UserConfirmation;
