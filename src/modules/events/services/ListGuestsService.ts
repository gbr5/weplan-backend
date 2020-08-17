import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import Guest from '@modules/events/infra/typeorm/entities/Guest';
import IGuestsRepository from '@modules/events/repositories/IGuestsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListGuestsService {
  constructor(
    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(event_id: string): Promise<Guest[]> {
    const Guests = await this.guestsRepository.findByEvent(event_id);

    return Guests;
  }
}

export default ListGuestsService;
