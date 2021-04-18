import Note from '@modules/notes/infra/typeorm/entities/Note';
import ICreateNoteDTO from '@modules/notes/dtos/ICreateNoteDTO';

export default interface INotesRepository {
  create(data: ICreateNoteDTO): Promise<Note>;
  findById(id: string): Promise<Note | undefined>;
  findByUserId(user_id: string): Promise<Note[]>;
  save(checkList: Note): Promise<Note>;
  delete(checkList: Note): Promise<void>;
}
