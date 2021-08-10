import { injectable, inject } from 'tsyringe';

import TransactionNote from '@modules/notes/infra/typeorm/entities/TransactionNote';
import ITransactionNotesRepository from '@modules/notes/repositories/ITransactionNotesRepository';
import ITransactionRepository from '@modules/transactions/repositories/ITransactionsRepository';
import AppError from '@shared/errors/AppError';
import IEventNotesRepository from '@modules/events/repositories/IEventNotesRepository';
import INotesRepository from '../repositories/INotesRepository';
import Note from '../infra/typeorm/entities/Note';

interface IRequest {
  note: string;
  transaction_id: string;
  event_id: string;
  author_id: string;
}

@injectable()
class CreateEventNoteAndTransactionNoteService {
  constructor(
    @inject('TransactionNotesRepository')
    private transactionNotesRepository: ITransactionNotesRepository,

    @inject('EventNotesRepository')
    private eventNotesRepository: IEventNotesRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionRepository,

    @inject('NotesRepository')
    private notesRepository: INotesRepository,
  ) {}

  public async execute({
    note,
    transaction_id,
    author_id,
    event_id,
  }: IRequest): Promise<TransactionNote> {
    const transaction = await this.transactionsRepository.findById(
      transaction_id,
    );
    if (!transaction) throw new AppError('Supplier not found!');
    const newNote: Note = await this.notesRepository.create({
      note,
      author_id,
      isNew: true,
    });
    const transactionNote = await this.transactionNotesRepository.create({
      transaction_id,
      note_id: newNote.id,
    });

    await this.eventNotesRepository.create({
      event_id,
      note_id: newNote.id,
    });

    return transactionNote;
  }
}

export default CreateEventNoteAndTransactionNoteService;
