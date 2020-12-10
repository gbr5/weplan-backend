import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IGuestsRepository from '@modules/events/repositories/IGuestsRepository';
import Guest from '../infra/typeorm/entities/Guest';

@injectable()
class ListGuestsService {
  constructor(
    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,
  ) {}

  public async execute(event_id: string): Promise<Guest[]> {
    const guests = await this.guestsRepository.findByEvent(event_id);

    return guests;
  }
}

export default ListGuestsService;
