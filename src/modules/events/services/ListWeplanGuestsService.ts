import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IWeplanGuestsRepository from '@modules/events/repositories/IWeplanGuestsRepository';
import WeplanGuest from '../infra/typeorm/entities/WeplanGuest';

@injectable()
class ListWeplanGuestsService {
  constructor(
    @inject('WeplanGuestsRepository')
    private weplanGuestsRepository: IWeplanGuestsRepository,
  ) {}

  public async execute(event_id: string): Promise<WeplanGuest[]> {
    const weplanGuests = await this.weplanGuestsRepository.findByEventId(
      event_id,
    );

    return weplanGuests;
  }
}

export default ListWeplanGuestsService;
