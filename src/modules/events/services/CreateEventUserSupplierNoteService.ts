import { injectable, inject } from 'tsyringe';

import EventUserSupplierNote from '@modules/events/infra/typeorm/entities/EventUserSupplierNote';
import IEventUserSupplierNotesRepository from '@modules/events/repositories/IEventUserSupplierNotesRepository';
import ICreateEventUserSupplierNoteDTO from '@modules/events/dtos/ICreateEventUserSupplierNoteDTO';
import AppError from '@shared/errors/AppError';
import IEventSupplierRepository from '../repositories/IEventSuppliersRepository';
import IEventNotesRepository from '../repositories/IEventNotesRepository';

@injectable()
class CreateEventUserSupplierNoteService {
  constructor(
    @inject('EventUserSupplierNotesRepository')
    private eventUserSupplierNotesRepository: IEventUserSupplierNotesRepository,

    @inject('EventSuppliersRepository')
    private eventSuppliersRepository: IEventSupplierRepository,

    @inject('EventNotesRepository')
    private eventNotesRepository: IEventNotesRepository,
  ) {}

  public async execute({
    event_note_id,
    event_supplier_id,
  }: ICreateEventUserSupplierNoteDTO): Promise<EventUserSupplierNote> {
    const eventSupplier = await this.eventSuppliersRepository.findById(
      event_supplier_id,
    );

    if (!eventSupplier) {
      throw new AppError('Event supplier not found!');
    }

    const eventNote = await this.eventNotesRepository.findById(event_note_id);

    if (!eventNote) {
      throw new AppError('Event Note not found!');
    }

    const eventUserSupplierNote = await this.eventUserSupplierNotesRepository.create(
      {
        event_note_id,
        event_supplier_id,
      },
    );

    return eventUserSupplierNote;
  }
}

export default CreateEventUserSupplierNoteService;
