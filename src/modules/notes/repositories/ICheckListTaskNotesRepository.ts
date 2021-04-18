import CheckListTaskNote from '@modules/notes/infra/typeorm/entities/CheckListTaskNote';

interface ICreateCheckListTaskNote {
  task_id: string;
  note_id: string;
}

export default interface ICheckListTaskNotesRepository {
  create(data: ICreateCheckListTaskNote): Promise<CheckListTaskNote>;
  findById(id: string): Promise<CheckListTaskNote | undefined>;
  findByAuthorId(author_id: string): Promise<CheckListTaskNote[]>;
  findByTaskId(task_id: string): Promise<CheckListTaskNote[]>;
  save(checkListTask: CheckListTaskNote): Promise<CheckListTaskNote>;
  delete(checkListTask: CheckListTaskNote): Promise<void>;
}
