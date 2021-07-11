import { getRepository, Repository } from 'typeorm';

import IEventTaskNotesRepository from '@modules/events/repositories/IEventTaskNotesRepository';

import EventTaskNote from '@modules/events/infra/typeorm/entities/EventTaskNote';
import ICreateEventTaskNoteDTO from '@modules/events/dtos/ICreateEventTaskNoteDTO';

class EventTaskNotesRepository implements IEventTaskNotesRepository {
  private ormRepository: Repository<EventTaskNote>;

  constructor() {
    this.ormRepository = getRepository(EventTaskNote);
  }

  public async findById(id: string): Promise<EventTaskNote | undefined> {
    const findEventTaskNote = await this.ormRepository.findOne(id);

    return findEventTaskNote;
  }

  public async findByTaskId(task_id: string): Promise<EventTaskNote[]> {
    const findEventTaskNote = await this.ormRepository.find({
      where: { task_id },
    });

    return findEventTaskNote;
  }

  public async create(data: ICreateEventTaskNoteDTO): Promise<EventTaskNote> {
    const event = this.ormRepository.create(data);

    await this.ormRepository.save(event);

    return event;
  }

  public async save(event: EventTaskNote): Promise<EventTaskNote> {
    return this.ormRepository.save(event);
  }

  public async delete(event_id: string): Promise<void> {
    await this.ormRepository.delete(event_id);
  }
}

export default EventTaskNotesRepository;
