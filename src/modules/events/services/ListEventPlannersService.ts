import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventPlannersRepository from '@modules/events/repositories/IEventPlannersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUserDTO from '../dtos/IUserDTO';

@injectable()
class ListEventPlannersService {
  constructor(
    @inject('EventPlannersRepository')
    private eventPlannersRepository: IEventPlannersRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(event_id: string): Promise<IUserDTO[]> {
    const EventPlanners = await this.eventPlannersRepository.findByEvent(
      event_id,
    );
    const users = ([] as unknown) as Promise<IUserDTO[]>;

    EventPlanners.map(async planner => {
      (await users).push({
        id: planner.planner_id,
        name: planner.Planner.name,
        avatar: planner.Planner.avatar ? planner.Planner.avatar : '',
      });
    });

    return users;
  }
}

export default ListEventPlannersService;
