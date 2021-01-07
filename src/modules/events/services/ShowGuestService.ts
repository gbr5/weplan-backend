import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGuestsRepository from '@modules/events/repositories/IGuestsRepository';

import Guest from '@modules/events/infra/typeorm/entities/Guest';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ShowGuestService {
  constructor(
    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(id: string): Promise<Guest> {
    // const cacheKey = `guest:${id}`;

    // let guest = await this.cacheProvider.recover<Guest>(cacheKey);

    // if (!guest) {
    const updatedGuest = await this.guestsRepository.findByGuestId(id);

    if (!updatedGuest) {
      throw new AppError('Guest not found.');
    }
    const guest = updatedGuest;

    // await this.cacheProvider.save(cacheKey, guest);
    // }

    return guest;
  }
}

export default ShowGuestService;
