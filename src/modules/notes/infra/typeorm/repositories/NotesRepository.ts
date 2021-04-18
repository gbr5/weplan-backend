import { getRepository, Repository } from 'typeorm';

import INotesRepository from '@modules/notes/repositories/INotesRepository';

import Note from '@modules/notes/infra/typeorm/entities/Note';
import ICreateNoteDTO from '@modules/notes/dtos/ICreateNoteDTO';

class NotesRepository implements INotesRepository {
  private ormRepository: Repository<Note>;

  constructor() {
    this.ormRepository = getRepository(Note);
  }

  public async findById(id: string): Promise<Note | undefined> {
    const findNote = await this.ormRepository.findOne({ id });

    return findNote;
  }

  public async findByUserId(user_id: string): Promise<Note[]> {
    const checkLists = await this.ormRepository.find({
      where: { user_id },
    });

    return checkLists;
  }

  public async create(data: ICreateNoteDTO): Promise<Note> {
    const checkList = this.ormRepository.create(data);

    await this.ormRepository.save(checkList);

    return checkList;
  }

  public async save(checkList: Note): Promise<Note> {
    return this.ormRepository.save(checkList);
  }

  public async delete({ id }: Note): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default NotesRepository;
