import { getRepository, Repository } from 'typeorm';

import IUserCheckListsRepository from '@modules/events/repositories/IUserCheckListsRepository';
import ICreateUserCheckListDTO from '@modules/events/dtos/ICreateUserCheckListDTO';
import UserCheckList from '@modules/events/infra/typeorm/entities/UserCheckList';

interface IRequest {
  event_id: string;
  id: string;
}

class UserCheckListsRepository implements IUserCheckListsRepository {
  private ormRepository: Repository<UserCheckList>;

  constructor() {
    this.ormRepository = getRepository(UserCheckList);
  }

  public async findById(id: string): Promise<UserCheckList | undefined> {
    const findUserCheckList = await this.ormRepository.findOne({ id });

    return findUserCheckList;
  }

  public async findByEvent(event_id: string): Promise<UserCheckList[]> {
    const findUserCheckList = await this.ormRepository.find({
      where: { event_id },
      order: { priority_level: 'DESC' },
    });

    return findUserCheckList;
  }

  public async create({
    name,
    priority_level,
    status,
    due_date,
    event_id,
  }: ICreateUserCheckListDTO): Promise<UserCheckList> {
    const userCheckList = this.ormRepository.create({
      name,
      priority_level,
      status,
      due_date,
      event_id,
    });

    await this.ormRepository.save(userCheckList);

    return userCheckList;
  }

  public async save(userCheckList: UserCheckList): Promise<UserCheckList> {
    return this.ormRepository.save(userCheckList);
  }

  public async delete({ id, event_id }: UserCheckList): Promise<void> {
    await this.ormRepository.delete({ id, event_id });
  }
}

export default UserCheckListsRepository;
