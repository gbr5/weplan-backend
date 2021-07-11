import { injectable, inject } from 'tsyringe';

import EventTaskNote from '@modules/events/infra/typeorm/entities/EventTaskNote';
import IEventTaskNotesRepository from '@modules/events/repositories/IEventTaskNotesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import INotesRepository from '@modules/notes/repositories/INotesRepository';
import IEventTasksRepository from '../repositories/IEventTasksRepository';

interface IRequest {
  user_id: string;
  task_id: string;
  note: string;
}

@injectable()
class CreateEventTaskNoteService {
  constructor(
    @inject('EventTaskNotesRepository')
    private eventTaskNotesRepository: IEventTaskNotesRepository,

    @inject('EventTasksRepository')
    private eventTasksRepository: IEventTasksRepository,

    @inject('NotesRepository')
    private notesRepository: INotesRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    task_id,
    note,
    user_id,
  }: IRequest): Promise<EventTaskNote> {
    const newNote = await this.notesRepository.create({
      author_id: user_id,
      isNew: true,
      note,
    });

    const eventTask = await this.eventTasksRepository.findById(task_id);

    if (!eventTask) {
      throw new AppError('Event task not found.');
    }

    const eventTaskNote = await this.eventTaskNotesRepository.create({
      task_id,
      note_id: newNote.id,
    });

    return eventTaskNote;
  }
}

export default CreateEventTaskNoteService;
