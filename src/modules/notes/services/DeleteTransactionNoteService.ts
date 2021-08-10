import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ITransactionNotesRepository from '../repositories/ITransactionNotesRepository';

@injectable()
class DeleteTransactionNoteService {
  constructor(
    @inject('TransactionNotesRepository')
    private transactionNotesRepository: ITransactionNotesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const transactionNote = await this.transactionNotesRepository.findById(id);

    if (!transactionNote) {
      throw new AppError('Supplier note not found.');
    }

    await this.transactionNotesRepository.delete(transactionNote);
  }
}

export default DeleteTransactionNoteService;
