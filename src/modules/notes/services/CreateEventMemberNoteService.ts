import { injectable, inject } from 'tsyringe';

import EventMemberNote from '@modules/notes/infra/typeorm/entities/EventMemberNote';
import IEventMemberNotesRepository from '@modules/notes/repositories/IEventMemberNotesRepository';
import IEventMemberRepository from '@modules/events/repositories/IEventMembersRepository';
import AppError from '@shared/errors/AppError';
import INotesRepository from '../repositories/INotesRepository';
import Note from '../infra/typeorm/entities/Note';

interface IRequest {
  note: string;
  member_id: string;
  author_id: string;
}

@injectable()
class CreateEventMemberNoteService {
  constructor(
    @inject('EventMemberNotesRepository')
    private eventMemberNotesRepository: IEventMemberNotesRepository,

    @inject('EventMembersRepository')
    private eventMembersRepository: IEventMemberRepository,

    @inject('NotesRepository')
    private notesRepository: INotesRepository,
  ) {}

  public async execute({
    note,
    member_id,
    author_id,
  }: IRequest): Promise<EventMemberNote> {
    const member = await this.eventMembersRepository.findById(member_id);
    if (!member) throw new AppError('Member not found!');
    const newNote: Note = await this.notesRepository.create({
      note,
      author_id,
      isNew: true,
    });
    const memberNote = await this.eventMemberNotesRepository.create({
      member_id,
      note_id: newNote.id,
    });

    return memberNote;
  }
}

export default CreateEventMemberNoteService;
