import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventNotesRepository from '@modules/events/repositories/IEventNotesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IEventNoteDTO from '../dtos/ICreateEventNoteDTO';

@injectable()
class ListEventNotesService {
  constructor(
    @inject('EventNotesRepository')
    private eventNotesRepository: IEventNotesRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(event_id: string): Promise<IEventNoteDTO[]> {
    const eventNotes = await this.eventNotesRepository.findByEvent(event_id);

    return eventNotes;
  }
}

export default ListEventNotesService;
