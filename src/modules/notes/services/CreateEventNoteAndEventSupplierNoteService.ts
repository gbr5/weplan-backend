import { injectable, inject } from 'tsyringe';

import EventSupplierNote from '@modules/notes/infra/typeorm/entities/EventSupplierNote';
import IEventSupplierNotesRepository from '@modules/notes/repositories/IEventSupplierNotesRepository';
import IEventSupplierRepository from '@modules/events/repositories/IEventSuppliersRepository';
import AppError from '@shared/errors/AppError';
import IEventNotesRepository from '@modules/events/repositories/IEventNotesRepository';
import INotesRepository from '../repositories/INotesRepository';
import Note from '../infra/typeorm/entities/Note';

interface IRequest {
  note: string;
  supplier_id: string;
  author_id: string;
}

@injectable()
class CreateEventNoteAndEventSupplierNoteService {
  constructor(
    @inject('EventSupplierNotesRepository')
    private eventSupplierNotesRepository: IEventSupplierNotesRepository,

    @inject('EventNotesRepository')
    private eventNotesRepository: IEventNotesRepository,

    @inject('EventSuppliersRepository')
    private eventSuppliersRepository: IEventSupplierRepository,

    @inject('NotesRepository')
    private notesRepository: INotesRepository,
  ) {}

  public async execute({
    note,
    supplier_id,
    author_id,
  }: IRequest): Promise<EventSupplierNote> {
    const supplier = await this.eventSuppliersRepository.findById(supplier_id);
    if (!supplier) throw new AppError('Supplier not found!');
    const newNote: Note = await this.notesRepository.create({
      note,
      author_id,
      isNew: true,
    });
    const supplierNote = await this.eventSupplierNotesRepository.create({
      supplier_id,
      note_id: newNote.id,
    });

    await this.eventNotesRepository.create({
      event_id: supplier.event_id,
      note_id: newNote.id,
    });

    return supplierNote;
  }
}

export default CreateEventNoteAndEventSupplierNoteService;
