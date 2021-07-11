import { injectable, inject } from 'tsyringe';

import INotesRepository from '../repositories/INotesRepository';
import Note from '../infra/typeorm/entities/Note';

interface IRequest {
  id: string;
  note: string;
}

@injectable()
class UpdateNoteIsNewService {
  constructor(
    @inject('NotesRepository')
    private notesRepository: INotesRepository,
  ) {}

  public async execute({ id, note }: IRequest): Promise<Note> {
    const updatedNote = await this.notesRepository.findById(id);

    if (!updatedNote) throw new Error('Note not found!');

    updatedNote.isNew = false;
    updatedNote.note = note;

    await this.notesRepository.save(updatedNote);

    return updatedNote;
  }
}

export default UpdateNoteIsNewService;
