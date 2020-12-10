import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IWeplanGuestsRepository from '@modules/events/repositories/IWeplanGuestsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import WeplanGuest from '../infra/typeorm/entities/WeplanGuest';

@injectable()
class ListUserAsWeplanGuestsService {
  constructor(
    @inject('WeplanGuestsRepository')
    private weplanGuestsRepository: IWeplanGuestsRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<WeplanGuest[]> {
    const weplanGuests = await this.weplanGuestsRepository.findByUserId(
      user_id,
    );

    return weplanGuests;
  }
}

export default ListUserAsWeplanGuestsService;
