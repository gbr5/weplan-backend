import Transaction from '@modules/transactions/infra/typeorm/entities/Transaction';
import ICreateTransactionDTO from '@modules/transactions/dtos/ICreateTransactionDTO';

export default interface ITransactionsRepository {
  create(data: ICreateTransactionDTO): Promise<Transaction>;
  findById(id: string): Promise<Transaction | undefined>;
  findByPayeeId(payee_id: string): Promise<Transaction[]>;
  findByPayerId(payer_id: string): Promise<Transaction[]>;
  save(transaction: Transaction): Promise<Transaction>;
  delete(transaction: Transaction): Promise<void>;
}
