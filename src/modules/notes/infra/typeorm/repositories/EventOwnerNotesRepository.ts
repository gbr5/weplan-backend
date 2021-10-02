import { getRepository, Repository } from 'typeorm';

import IEventOwnerNotesRepository from '@modules/notes/repositories/IEventOwnerNotesRepository';

import EventOwnerNote from '@modules/notes/infra/typeorm/entities/EventOwnerNote';
import ICreateEventOwnerNoteDTO from '@modules/notes/dtos/ICreateEventOwnerNoteDTO';

class EventOwnerNotesRepository implements IEventOwnerNotesRepository {
  private ormRepository: Repository<EventOwnerNote>;

  constructor() {
    this.ormRepository = getRepository(EventOwnerNote);
  }

  public async findById(id: string): Promise<EventOwnerNote | undefined> {
    const findEventOwnerNote = await this.ormRepository.findOne({ id });

    return findEventOwnerNote;
  }

  public async findByOwnerId(owner_id: string): Promise<EventOwnerNote[]> {
    const eventOwnerNotes = await this.ormRepository.find({
      where: { owner_id },
    });

    return eventOwnerNotes;
  }

  public async create(data: ICreateEventOwnerNoteDTO): Promise<EventOwnerNote> {
    const eventOwnerNote = this.ormRepository.create(data);

    await this.ormRepository.save(eventOwnerNote);

    return eventOwnerNote;
  }

  public async save(eventOwnerNote: EventOwnerNote): Promise<EventOwnerNote> {
    return this.ormRepository.save(eventOwnerNote);
  }

  public async delete({ id }: EventOwnerNote): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default EventOwnerNotesRepository;
