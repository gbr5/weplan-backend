import TransactionFile from '@modules/transactions/infra/typeorm/entities/TransactionFile';
import ICreateTransactionFileDTO from '../dtos/ICreateTransactionFileDTO';

export default interface ITransactionFilesRepository {
  create(data: ICreateTransactionFileDTO): Promise<TransactionFile>;
  findByTransactionId(user_id: string): Promise<TransactionFile[]>;
  findById(id: string): Promise<TransactionFile | undefined>;
  save(data: TransactionFile): Promise<TransactionFile>;
  delete(data: TransactionFile): Promise<void>;
}
