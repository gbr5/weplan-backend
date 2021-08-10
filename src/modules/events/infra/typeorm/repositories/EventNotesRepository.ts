import { getRepository, Repository } from 'typeorm';

import IEventNotesRepository from '@modules/events/repositories/IEventNotesRepository';
import ICreateEventNoteDTO from '@modules/events/dtos/ICreateEventNoteDTO';
import EventNote from '@modules/events/infra/typeorm/entities/EventNote';

class EventNotesRepository implements IEventNotesRepository {
  private ormRepository: Repository<EventNote>;

  constructor() {
    this.ormRepository = getRepository(EventNote);
  }

  public async findByEvent(event_id: string): Promise<EventNote[]> {
    const findEventNote = await this.ormRepository.find({
      where: { event_id },
    });

    return findEventNote;
  }

  public async findById(id: string): Promise<EventNote | undefined> {
    const findEventNote = await this.ormRepository.findOne(id);

    return findEventNote;
  }

  public async create(data: ICreateEventNoteDTO): Promise<EventNote> {
    const eventNote = this.ormRepository.create(data);

    await this.ormRepository.save(eventNote);

    return eventNote;
  }

  public async save(eventNote: EventNote): Promise<EventNote> {
    return this.ormRepository.save(eventNote);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }
}

export default EventNotesRepository;
