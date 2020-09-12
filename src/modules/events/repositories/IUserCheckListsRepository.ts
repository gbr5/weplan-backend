import UserCheckList from '@modules/events/infra/typeorm/entities/UserCheckList';
import ICreateUserCheckListDTO from '@modules/events/dtos/ICreateUserCheckListDTO';

export default interface IUserCheckListsRepository {
  findByEvent(event_id: string): Promise<UserCheckList[]>;
  findById(id: string): Promise<UserCheckList | undefined>;
  create(data: ICreateUserCheckListDTO): Promise<UserCheckList>;
  save(checkList: UserCheckList): Promise<UserCheckList>;
  delete(checkList: UserCheckList): Promise<void>;
}
