import { injectable, inject } from 'tsyringe';

import EventOwnerNote from '@modules/notes/infra/typeorm/entities/EventOwnerNote';
import IEventOwnerNotesRepository from '@modules/notes/repositories/IEventOwnerNotesRepository';
import IEventOwnerRepository from '@modules/events/repositories/IEventOwnersRepository';
import AppError from '@shared/errors/AppError';
import INotesRepository from '../repositories/INotesRepository';
import Note from '../infra/typeorm/entities/Note';

interface IRequest {
  note: string;
  owner_id: string;
  author_id: string;
}

@injectable()
class CreateEventOwnerNoteService {
  constructor(
    @inject('EventOwnerNotesRepository')
    private eventOwnerNotesRepository: IEventOwnerNotesRepository,

    @inject('EventOwnersRepository')
    private eventOwnersRepository: IEventOwnerRepository,

    @inject('NotesRepository')
    private notesRepository: INotesRepository,
  ) {}

  public async execute({
    note,
    owner_id,
    author_id,
  }: IRequest): Promise<EventOwnerNote> {
    const owner = await this.eventOwnersRepository.findById(owner_id);
    if (!owner) throw new AppError('Owner not found!');
    const newNote: Note = await this.notesRepository.create({
      note,
      author_id,
      isNew: true,
    });
    const ownerNote = await this.eventOwnerNotesRepository.create({
      owner_id,
      note_id: newNote.id,
    });

    return ownerNote;
  }
}

export default CreateEventOwnerNoteService;
