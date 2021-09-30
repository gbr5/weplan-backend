import TaskNote from '@modules/tasks/infra/typeorm/entities/TaskNote';
import ICreateTaskNoteDTO from '@modules/tasks/dtos/ICreateTaskNoteDTO';

export default interface ITaskNotesRepository {
  create(data: ICreateTaskNoteDTO): Promise<TaskNote>;
  findById(id: string): Promise<TaskNote | undefined>;
  findByTaskId(task_id: string): Promise<TaskNote[]>;
  save(task: TaskNote): Promise<TaskNote>;
  delete(id: string): Promise<void>;
}
