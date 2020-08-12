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

  public async execute(event_name: string): Promise<EventInfo> {
    const eventInfo = await this.eventInfosRepository.findByEvent(event_name);

    if (!eventInfo) {
      throw new AppError('EventInfo not found.');
    }

    return eventInfo;
  }
}

export default ShowEventInfoService;
