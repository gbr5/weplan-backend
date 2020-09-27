import Transaction from '@modules/finances/infra/typeorm/entities/Transaction';
import ITransactionDTO from '@modules/finances/dtos/ITransactionDTO';
import ICreateMultipleTransactionsDTO from '../dtos/ICreateMultipleTransactionsDTO';

export default interface ITransactionsRepository {
  create(data: ITransactionDTO): Promise<Transaction>;
  createMultiple(
    data: ICreateMultipleTransactionsDTO[],
    agreement_id: string,
  ): Promise<Transaction[]>;
  findByAgreementId(agreement_id: string): Promise<Transaction[]>;
  findByAgreementIdAndDueDate(
    agreement_id: string,
    due_date: Date,
  ): Promise<Transaction | undefined>;
  findById(id: string): Promise<Transaction | undefined>;
  save(data: Transaction): Promise<Transaction>;
  delete(data: Transaction): Promise<void>;
}
