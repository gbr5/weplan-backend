import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventPlannersRepository from '@modules/events/repositories/IEventPlannersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IEventPlannerDTO from '../dtos/IEventPlannerDTO';

@injectable()
class ListEventPlannersService {
  constructor(
    @inject('EventPlannersRepository')
    private eventPlannersRepository: IEventPlannersRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(event_id: string): Promise<IEventPlannerDTO[]> {
    const EventPlanners = await this.eventPlannersRepository.findByEvent(
      event_id,
    );
    const users = ([] as unknown) as Promise<IEventPlannerDTO[]>;

    EventPlanners.map(async planner => {
      (await users).push({
        id: planner.planner_id,
        name: planner.Planner.name,
        avatar: planner.Planner.avatar ? planner.Planner.avatar : '',
        trimmed_name: planner.Planner.trimmed_name,
      });
    });

    return users;
  }
}

export default ListEventPlannersService;
