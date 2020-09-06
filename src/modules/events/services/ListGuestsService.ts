import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IGuestsRepository from '@modules/events/repositories/IGuestsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import IGuestDTO from '../dtos/IGuestDTO';

@injectable()
class ListGuestsService {
  constructor(
    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(event_id: string): Promise<IGuestDTO[]> {
    try {
      const users = ([] as unknown) as Promise<IGuestDTO[]>;

      const guests = await this.guestsRepository.findByEvent(event_id);

      guests.map(async guest => {
        (await users).push({
          id: guest.id,
          first_name: guest.first_name,
          last_name: guest.last_name,
          description: guest.description,
          confirmed: guest.confirmed,
          host: guest.Host.name,
          weplanUser: guest.weplanUser,
        });
      });

      return users;
    } catch (err) {
      throw new AppError(err);
    }
  }
}

export default ListGuestsService;
