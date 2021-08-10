import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import TransactionNote from '@modules/notes/infra/typeorm/entities/TransactionNote';
import ITransactionNotesRepository from '@modules/notes/repositories/ITransactionNotesRepository';

@injectable()
class ListTransactionNotesService {
  constructor(
    @inject('TransactionNotesRepository')
    private transactionNotesRepository: ITransactionNotesRepository,
  ) {}

  public async execute(transaction_id: string): Promise<TransactionNote[]> {
    const transactionNotes = await this.transactionNotesRepository.findByTransactionId(
      transaction_id,
    );

    return transactionNotes;
  }
}

export default ListTransactionNotesService;
