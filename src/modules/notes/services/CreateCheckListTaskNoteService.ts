import { injectable, inject } from 'tsyringe';

import CheckListTaskNote from '@modules/notes/infra/typeorm/entities/CheckListTaskNote';
import ICheckListTaskNotesRepository from '@modules/notes/repositories/ICheckListTaskNotesRepository';
import ICreateCheckListTaskNoteDTO from '../dtos/ICreateCheckListTaskNoteDTO';
import INotesRepository from '../repositories/INotesRepository';
import Note from '../infra/typeorm/entities/Note';

@injectable()
class CreateCheckListTaskNoteService {
  constructor(
    @inject('CheckListTaskNotesRepository')
    private checkListTaskNotesRepository: ICheckListTaskNotesRepository,
    @inject('NotesRepository')
    private notesRepository: INotesRepository,
  ) {}

  public async execute({
    note,
    task_id,
  }: ICreateCheckListTaskNoteDTO): Promise<CheckListTaskNote> {
    console.log({
      note,
      task_id,
    });
    const newNote: Note = await this.notesRepository.create(note);
    const checkList = await this.checkListTaskNotesRepository.create({
      task_id,
      note_id: newNote.id,
    });

    return checkList;
  }
}

export default CreateCheckListTaskNoteService;
