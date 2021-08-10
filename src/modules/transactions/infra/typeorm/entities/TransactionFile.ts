import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import uploadConfig from '@config/upload';
import { Expose } from 'class-transformer';
import Transaction from './Transaction';

@Entity('transaction_files')
class TransactionFile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  transaction_id: string;

  @ManyToOne(() => Transaction, transaction => transaction.files)
  @JoinColumn({ name: 'transaction_id' })
  transaction: Transaction;

  @Column()
  name: string;

  @Column()
  file_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'url' })
  getAvatarUrl(): string | null {
    if (!this.file_name) {
      return null;
    }
    switch (uploadConfig.driver) {
      case 'disk':
        return `${process.env.APP_API_URL}/files/${this.file_name}`;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.amazonaws.com/${this.file_name}`;
      default:
        return null;
    }
  }
}

export default TransactionFile;
