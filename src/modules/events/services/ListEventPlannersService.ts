import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import EventPlanner from '@modules/events/infra/typeorm/entities/EventPlanner';
import IEventPlannersRepository from '@modules/events/repositories/IEventPlannersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListEventPlannersService {
  constructor(
    @inject('EventPlannersRepository')
    private eventPlannersRepository: IEventPlannersRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(event_id: string): Promise<EventPlanner[]> {
    const EventPlanners = await this.eventPlannersRepository.findByEvent(
      event_id,
    );

    return EventPlanners;
  }
}

export default ListEventPlannersService;
