import TaskFollower from '@modules/tasks/infra/typeorm/entities/TaskFollower';
import ICreateTaskFollowerDTO from '@modules/tasks/dtos/ICreateTaskFollowerDTO';

export default interface ITaskFollowersRepository {
  create(data: ICreateTaskFollowerDTO): Promise<TaskFollower>;
  findById(id: string): Promise<TaskFollower | undefined>;
  findByTaskId(task_id: string): Promise<TaskFollower[]>;
  findByUserId(user_id: string): Promise<TaskFollower[]>;
  save(taskFollower: TaskFollower): Promise<TaskFollower>;
  delete(id: string): Promise<void>;
}
