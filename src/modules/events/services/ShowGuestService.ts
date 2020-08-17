import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGuestsRepository from '@modules/events/repositories/IGuestsRepository';

import Guest from '@modules/events/infra/typeorm/entities/Guest';

@injectable()
class ShowGuestService {
  constructor(
    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,
  ) {}

  public async execute(
    event_id: string,
    first_name: string,
    last_name: string,
  ): Promise<Guest> {
    const guest = await this.guestsRepository.findByEventFirstNameAndLastName(
      event_id,
      first_name,
      last_name,
    );

    if (!guest) {
      throw new AppError('Guest not found.');
    }

    return guest;
  }
}

export default ShowGuestService;
