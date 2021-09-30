import Task from '@modules/tasks/infra/typeorm/entities/Task';
import ICreateTaskDTO from '@modules/tasks/dtos/ICreateTaskDTO';

export default interface ITasksRepository {
  create(data: ICreateTaskDTO): Promise<Task>;
  findById(id: string): Promise<Task | undefined>;
  findByUserId(user_id: string): Promise<Task[]>;
  save(checkList: Task): Promise<Task>;
  delete(checkList: Task): Promise<void>;
}
