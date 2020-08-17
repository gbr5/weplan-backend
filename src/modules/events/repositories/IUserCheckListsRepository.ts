import UserCheckList from '@modules/events/infra/typeorm/entities/UserCheckList';
import ICreateUserCheckListDTO from '@modules/events/dtos/ICreateUserCheckListDTO';

export default interface IUserCheckListRepository {
  findByEvent(event_id: string): Promise<UserCheckList[]>;
  findByIdAndEvent(
    event_id: string,
    id: string,
  ): Promise<UserCheckList | undefined>;
  create(data: ICreateUserCheckListDTO): Promise<UserCheckList>;
  save(checkList: UserCheckList): Promise<UserCheckList>;
  delete(checkList: UserCheckList): Promise<void>;
}
