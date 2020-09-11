import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventInfosRepository from '@modules/events/repositories/IEventInfosRepository';

import EventInfo from '@modules/events/infra/typeorm/entities/EventInfo';

@injectable()
class ShowEventInfoService {
  constructor(
    @inject('EventInfosRepository')
    private eventInfosRepository: IEventInfosRepository,
  ) {}

  public async execute(event_id: string): Promise<EventInfo> {
    console.log(event_id);

    const eventInfo = await this.eventInfosRepository.findByEvent(event_id);
    console.log('show service, eventInfo:', eventInfo);

    if (!eventInfo) {
      throw new AppError('EventInfo not found.');
    }

    return eventInfo;
  }
}

export default ShowEventInfoService;
