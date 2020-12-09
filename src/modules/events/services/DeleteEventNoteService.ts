import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventNotesRepository from '@modules/events/repositories/IEventNotesRepository';

import EventNote from '@modules/events/infra/typeorm/entities/EventNote';

@injectable()
class DeleteEventNoteService {
  constructor(
    @inject('EventNotesRepository')
    private eventNotesRepository: IEventNotesRepository,
  ) {}

  public async execute(id: string): Promise<EventNote> {
    const eventNote = await this.eventNotesRepository.findById(id);

    if (!eventNote || !eventNote.isActive) {
      throw new AppError('Event note not found.');
    }

    eventNote.isActive = false;

    const updatedEventNote = await this.eventNotesRepository.save(eventNote);

    return updatedEventNote;
  }
}

export default DeleteEventNoteService;
