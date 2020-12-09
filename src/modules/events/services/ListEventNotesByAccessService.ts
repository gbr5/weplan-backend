import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventNotesRepository from '@modules/events/repositories/IEventNotesRepository';
import IEventNoteDTO from '../dtos/ICreateEventNoteDTO';

@injectable()
class ListEventNotesByAccessService {
  constructor(
    @inject('EventNotesRepository')
    private eventNotesRepository: IEventNotesRepository,
  ) {}

  public async execute(
    event_id: string,
    access: string,
  ): Promise<IEventNoteDTO[]> {
    const eventNotes = await this.eventNotesRepository.findByEventAndAccess(
      event_id,
      access,
    );

    return eventNotes;
  }
}

export default ListEventNotesByAccessService;
