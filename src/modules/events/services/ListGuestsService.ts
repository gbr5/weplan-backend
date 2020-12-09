import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IGuestsRepository from '@modules/events/repositories/IGuestsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import Guest from '../infra/typeorm/entities/Guest';

@injectable()
class ListGuestsService {
  constructor(
    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(event_id: string): Promise<Guest[]> {
    try {
      const guests = await this.guestsRepository.findByEvent(event_id);

      return guests;
    } catch (err) {
      throw new AppError(err);
    }
  }
}

export default ListGuestsService;
