import TransactionNote from '@modules/notes/infra/typeorm/entities/TransactionNote';
import ICreateTransactionNoteDTO from '@modules/notes/dtos/ICreateTransactionNoteDTO';

export default interface ITransactionNotesRepository {
  create(data: ICreateTransactionNoteDTO): Promise<TransactionNote>;
  findById(id: string): Promise<TransactionNote | undefined>;
  findByTransactionId(transaction_id: string): Promise<TransactionNote[]>;
  save(transactionNote: TransactionNote): Promise<TransactionNote>;
  delete(transactionNote: TransactionNote): Promise<void>;
}
