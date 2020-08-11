import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import Guest from '@modules/events/infra/typeorm/entities/Guest';
import IGuestsRepository from '@modules/events/repositories/IGuestsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListHostGuestsService {
  constructor(
    @inject('GuestsRepository')
    private GuestsRepository: IGuestsRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(event_name: string, host_id: string): Promise<Guest[]> {
    const Guests = await this.GuestsRepository.findByHostIdAndEvent(
      event_name,
      host_id,
    );

    return Guests;
  }
}

export default ListHostGuestsService;
