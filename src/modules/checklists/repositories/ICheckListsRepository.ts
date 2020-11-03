import CheckList from '@modules/checklists/infra/typeorm/entities/CheckList';
import ICreateCheckListDTO from '@modules/checklists/dtos/ICreateCheckListDTO';

export default interface ICheckListsRepository {
  create(data: ICreateCheckListDTO): Promise<CheckList>;
  findById(id: string): Promise<CheckList | undefined>;
  findByUserId(user_id: string): Promise<CheckList[]>;
  save(checkList: CheckList): Promise<CheckList>;
  delete(checkList: CheckList): Promise<void>;
}
