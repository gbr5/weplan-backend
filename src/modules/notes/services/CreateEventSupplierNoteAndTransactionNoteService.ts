import { injectable, inject } from 'tsyringe';

import TransactionNote from '@modules/notes/infra/typeorm/entities/TransactionNote';
import ITransactionNotesRepository from '@modules/notes/repositories/ITransactionNotesRepository';
import ITransactionRepository from '@modules/transactions/repositories/ITransactionsRepository';
import AppError from '@shared/errors/AppError';
import IEventSupplierNotesRepository from '@modules/notes/repositories/IEventSupplierNotesRepository';
import IEventNotesRepository from '@modules/events/repositories/IEventNotesRepository';
import IEventSupplierRepository from '@modules/events/repositories/IEventSuppliersRepository';
import INotesRepository from '../repositories/INotesRepository';
import Note from '../infra/typeorm/entities/Note';

interface IRequest {
  note: string;
  transaction_id: string;
  supplier_id: string;
  author_id: string;
}

@injectable()
class CreateEventSupplierNoteAndTransactionNoteService {
  constructor(
    @inject('TransactionNotesRepository')
    private transactionNotesRepository: ITransactionNotesRepository,

    @inject('EventSupplierNotesRepository')
    private eventSupplierNotesRepository: IEventSupplierNotesRepository,

    @inject('EventSuppliersRepository')
    private eventSuppliersRepository: IEventSupplierRepository,

    @inject('TransactionsRepository')
    private transactionsRepository: ITransactionRepository,

    @inject('EventNotesRepository')
    private eventNotesRepository: IEventNotesRepository,

    @inject('NotesRepository')
    private notesRepository: INotesRepository,
  ) {}

  public async execute({
    note,
    transaction_id,
    author_id,
    supplier_id,
  }: IRequest): Promise<TransactionNote> {
    const transaction = await this.transactionsRepository.findById(
      transaction_id,
    );
    if (!transaction) throw new AppError('Transaction not found!');
    const supplier = await this.eventSuppliersRepository.findById(supplier_id);
    if (!supplier) throw new AppError('Supplier not found!');
    const newNote: Note = await this.notesRepository.create({
      note,
      author_id,
      isNew: true,
    });
    const transactionNote = await this.transactionNotesRepository.create({
      transaction_id,
      note_id: newNote.id,
    });

    await this.eventSupplierNotesRepository.create({
      supplier_id,
      note_id: newNote.id,
    });

    await this.eventNotesRepository.create({
      event_id: supplier.event_id,
      note_id: newNote.id,
    });

    return transactionNote;
  }
}

export default CreateEventSupplierNoteAndTransactionNoteService;
