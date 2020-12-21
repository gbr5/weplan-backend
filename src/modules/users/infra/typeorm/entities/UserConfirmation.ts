import WeplanGuest from '@modules/events/infra/typeorm/entities/WeplanGuest';
import CompanyEmployee from '@modules/suppliers/infra/typeorm/entities/CompanyEmployee';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import UserConfirmationFile from './UserConfirmationFile';

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

  @ManyToOne(() => CompanyEmployee, employee => employee.confirmations)
  @JoinColumn({ name: 'receiver_id' })
  employeeReceiver: CompanyEmployee;

  @ManyToOne(() => WeplanGuest, guest => guest.userConfirmations)
  @JoinColumn({ name: 'receiver_id' })
  weplanGuestReceiver: WeplanGuest;

  @OneToMany(
    () => UserConfirmationFile,
    userConfirmationFile => userConfirmationFile.userConfirmation,
    { eager: true },
  )
  @JoinColumn({ name: 'receiver_id' })
  userConfirmationFiles: UserConfirmationFile[];
}

export default UserConfirmation;
