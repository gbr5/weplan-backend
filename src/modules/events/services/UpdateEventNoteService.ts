import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventNotesRepository from '@modules/events/repositories/IEventNotesRepository';

import EventNote from '@modules/events/infra/typeorm/entities/EventNote';

interface IRequest {
  id: string;
  access: string;
  note: string;
  color: string;
}

@injectable()
class UpdateEventNoteService {
  constructor(
    @inject('EventNotesRepository')
    private eventNotesRepository: IEventNotesRepository,
  ) {}

  public async execute({
    id,
    access,
    note,
    color,
  }: IRequest): Promise<EventNote> {
    const eventNote = await this.eventNotesRepository.findById(id);

    if (!eventNote || !eventNote.isActive) {
      throw new AppError('Event note not found.');
    }

    eventNote.access = access;
    eventNote.note = note;
    eventNote.color = color;

    const updatedEventNote = await this.eventNotesRepository.save(eventNote);

    return updatedEventNote;
  }
}

export default UpdateEventNoteService;
