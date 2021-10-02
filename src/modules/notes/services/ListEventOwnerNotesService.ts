import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import EventOwnerNote from '@modules/notes/infra/typeorm/entities/EventOwnerNote';
import IEventOwnerNotesRepository from '@modules/notes/repositories/IEventOwnerNotesRepository';

@injectable()
class ListEventOwnerNotesService {
  constructor(
    @inject('EventOwnerNotesRepository')
    private eventOwnerNotesRepository: IEventOwnerNotesRepository,
  ) {}

  public async execute(owner_id: string): Promise<EventOwnerNote[]> {
    const ownerNotes = await this.eventOwnerNotesRepository.findByOwnerId(
      owner_id,
    );

    return ownerNotes;
  }
}

export default ListEventOwnerNotesService;
