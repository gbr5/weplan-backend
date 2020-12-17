import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGuestsRepository from '@modules/events/repositories/IGuestsRepository';
import Guest from '@modules/events/infra/typeorm/entities/Guest';

interface IRequest {
  id: string;
}
@injectable()
class GuestConfirmationService {
  constructor(
    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Guest> {
    const guest = await this.guestsRepository.findByGuestId(id);

    if (!guest) {
      throw new AppError('Guest not found.');
    }

    guest.confirmed = !guest.confirmed;

    const updatedGuest = await this.guestsRepository.save(guest);

    return updatedGuest;
  }
}

export default GuestConfirmationService;
