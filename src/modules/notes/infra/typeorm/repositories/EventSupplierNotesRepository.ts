import { getRepository, Repository } from 'typeorm';

import IEventSupplierNotesRepository from '@modules/notes/repositories/IEventSupplierNotesRepository';

import EventSupplierNote from '@modules/notes/infra/typeorm/entities/EventSupplierNote';
import ICreateEventSupplierNoteDTO from '@modules/notes/dtos/ICreateEventSupplierNoteDTO';

class EventSupplierNotesRepository implements IEventSupplierNotesRepository {
  private ormRepository: Repository<EventSupplierNote>;

  constructor() {
    this.ormRepository = getRepository(EventSupplierNote);
  }

  public async findById(id: string): Promise<EventSupplierNote | undefined> {
    const findEventSupplierNote = await this.ormRepository.findOne({ id });

    return findEventSupplierNote;
  }

  public async findBySupplierId(
    supplier_id: string,
  ): Promise<EventSupplierNote[]> {
    const eventSupplierNotes = await this.ormRepository.find({
      where: { supplier_id },
    });

    return eventSupplierNotes;
  }

  public async create(
    data: ICreateEventSupplierNoteDTO,
  ): Promise<EventSupplierNote> {
    const eventSupplierNote = this.ormRepository.create(data);

    await this.ormRepository.save(eventSupplierNote);

    return eventSupplierNote;
  }

  public async save(
    eventSupplierNote: EventSupplierNote,
  ): Promise<EventSupplierNote> {
    return this.ormRepository.save(eventSupplierNote);
  }

  public async delete({ id }: EventSupplierNote): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default EventSupplierNotesRepository;
