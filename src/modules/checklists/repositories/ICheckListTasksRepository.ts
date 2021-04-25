import CheckListTask from '@modules/checklists/infra/typeorm/entities/CheckListTask';
import ICreateCheckListTaskDTO from '@modules/checklists/dtos/ICreateCheckListTaskDTO';

export default interface ICheckListTasksRepository {
  create(data: ICreateCheckListTaskDTO): Promise<CheckListTask>;
  findById(id: string): Promise<CheckListTask | undefined>;
  findAllById(ids: string[]): Promise<CheckListTask[]>;
  findByOwnerId(owner_id: string): Promise<CheckListTask[]>;
  findByCheckListId(check_list_id: string): Promise<CheckListTask[]>;
  save(checkListTask: CheckListTask): Promise<CheckListTask>;
  delete(checkListTask: CheckListTask): Promise<void>;
}
