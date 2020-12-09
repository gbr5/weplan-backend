import { getRepository, Repository } from 'typeorm';

import IEventUserSupplierNotesRepository from '@modules/events/repositories/IEventUserSupplierNotesRepository';
import ICreateEventUserSupplierNoteDTO from '@modules/events/dtos/ICreateEventUserSupplierNoteDTO';
import EventUserSupplierNote from '@modules/events/infra/typeorm/entities/EventUserSupplierNote';

class EventUserSupplierNotesRepository
  implements IEventUserSupplierNotesRepository {
  private ormRepository: Repository<EventUserSupplierNote>;

  constructor() {
    this.ormRepository = getRepository(EventUserSupplierNote);
  }

  public async findByEventNote(
    event_note_id: string,
  ): Promise<EventUserSupplierNote[]> {
    const findEventUserSupplierNote = await this.ormRepository.find({
      where: { event_note_id },
    });

    return findEventUserSupplierNote;
  }

  public async findByEventSupplier(
    event_supplier_id: string,
  ): Promise<EventUserSupplierNote[]> {
    const findEventUserSupplierNote = await this.ormRepository.find({
      where: { event_supplier_id },
    });

    return findEventUserSupplierNote;
  }

  public async findById(
    id: string,
  ): Promise<EventUserSupplierNote | undefined> {
    const findEventUserSupplierNote = await this.ormRepository.findOne(id);

    return findEventUserSupplierNote;
  }

  public async create(
    data: ICreateEventUserSupplierNoteDTO,
  ): Promise<EventUserSupplierNote> {
    const eventUserSupplierNote = this.ormRepository.create(data);

    await this.ormRepository.save(eventUserSupplierNote);

    return eventUserSupplierNote;
  }

  public async save(
    data: EventUserSupplierNote,
  ): Promise<EventUserSupplierNote> {
    return this.ormRepository.save(data);
  }

  public async delete(data: EventUserSupplierNote): Promise<void> {
    await this.ormRepository.delete(data.id);
  }
}

export default EventUserSupplierNotesRepository;
