import { getRepository, Repository } from 'typeorm';

import IUserCheckListsRepository from '@modules/events/repositories/IUserCheckListsRepository';
import ICreateUserCheckListDTO from '@modules/events/dtos/ICreateUserCheckListDTO';
import UserCheckList from '@modules/events/infra/typeorm/entities/UserCheckList';

interface IRequest {
  event_name: string;
  id: string;
}

class UserCheckListsRepository implements IUserCheckListsRepository {
  private ormRepository: Repository<UserCheckList>;

  constructor() {
    this.ormRepository = getRepository(UserCheckList);
  }

  public async findByIdAndEvent(
    event_name: string,
    id: string,
  ): Promise<UserCheckList | undefined> {
    const findUserCheckList = await this.ormRepository.findOne({
      where: { event_name, id },
    });

    return findUserCheckList;
  }

  public async findByEvent(event_name: string): Promise<UserCheckList[]> {
    const findUserCheckList = await this.ormRepository.find({
      where: { event_name },
    });

    return findUserCheckList;
  }

  public async create({
    name,
    priority_level,
    checked,
    event_name,
  }: ICreateUserCheckListDTO): Promise<UserCheckList> {
    const userCheckList = this.ormRepository.create({
      name,
      priority_level,
      checked,
      event_name,
    });

    await this.ormRepository.save(userCheckList);

    return userCheckList;
  }

  public async save(userCheckList: UserCheckList): Promise<UserCheckList> {
    return this.ormRepository.save(userCheckList);
  }

  public async delete({ id, event_name }: UserCheckList): Promise<void> {
    await this.ormRepository.delete({ id, event_name });
  }
}

export default UserCheckListsRepository;
