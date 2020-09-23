import Transaction from '@modules/finances/infra/typeorm/entities/Transaction';
import ICreateTransactionDTO from '@modules/finances/dtos/ICreateTransactionDTO';

export default interface ITransactionsRepository {
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  findByAgreementId(agreement_id: string): Promise<Transaction[]>;
  findByAgreementIdAndDueDate(
    agreement_id: string,
    due_date: Date,
  ): Promise<Transaction | undefined>;
  findById(id: string): Promise<Transaction | undefined>;
  save(data: ICreateTransactionDTO): Promise<Transaction>;
  delete(data: ICreateTransactionDTO): Promise<void>;
}
