import { injectable, inject } from 'tsyringe';

import EventNote from '@modules/events/infra/typeorm/entities/EventNote';
import IEventNotesRepository from '@modules/events/repositories/IEventNotesRepository';
import AppError from '@shared/errors/AppError';
import INotesRepository from '@modules/notes/repositories/INotesRepository';
import IEventsRepository from '../repositories/IEventsRepository';

interface IRequest {
  note: string;
  event_id: string;
  author_id: string;
}
@injectable()
class CreateEventNoteService {
  constructor(
    @inject('EventNotesRepository')
    private eventNotesRepository: IEventNotesRepository,

    @inject('NotesRepository')
    private notesRepository: INotesRepository,

    @inject('EventsRepository')
    private eventsRepository: IEventsRepository,
  ) {}

  public async execute({
    event_id,
    note,
    author_id,
  }: IRequest): Promise<EventNote> {
    const newNote = await this.notesRepository.create({
      author_id,
      isNew: true,
      note,
    });

    const event = await this.eventsRepository.findById(event_id);

    if (!event) {
      throw new AppError('Event not found!');
    }

    const eventNote = await this.eventNotesRepository.create({
      event_id,
      note_id: newNote.id,
    });

    return eventNote;
  }
}

export default CreateEventNoteService;
