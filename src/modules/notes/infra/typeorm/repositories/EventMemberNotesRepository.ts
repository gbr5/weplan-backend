import { getRepository, Repository } from 'typeorm';

import IEventMemberNotesRepository from '@modules/notes/repositories/IEventMemberNotesRepository';

import EventMemberNote from '@modules/notes/infra/typeorm/entities/EventMemberNote';
import ICreateEventMemberNoteDTO from '@modules/notes/dtos/ICreateEventMemberNoteDTO';

class EventMemberNotesRepository implements IEventMemberNotesRepository {
  private ormRepository: Repository<EventMemberNote>;

  constructor() {
    this.ormRepository = getRepository(EventMemberNote);
  }

  public async findById(id: string): Promise<EventMemberNote | undefined> {
    const findEventMemberNote = await this.ormRepository.findOne({ id });

    return findEventMemberNote;
  }

  public async findByMemberId(member_id: string): Promise<EventMemberNote[]> {
    const eventMemberNotes = await this.ormRepository.find({
      where: { member_id },
    });

    return eventMemberNotes;
  }

  public async create(
    data: ICreateEventMemberNoteDTO,
  ): Promise<EventMemberNote> {
    const eventMemberNote = this.ormRepository.create(data);

    await this.ormRepository.save(eventMemberNote);

    return eventMemberNote;
  }

  public async save(
    eventMemberNote: EventMemberNote,
  ): Promise<EventMemberNote> {
    return this.ormRepository.save(eventMemberNote);
  }

  public async delete({ id }: EventMemberNote): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default EventMemberNotesRepository;
