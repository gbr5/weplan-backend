import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IGuestsRepository from '@modules/events/repositories/IGuestsRepository';

interface IRequest {
  event_id: string;
  first_name: string;
  last_name: string;
}
@injectable()
class DeleteGuestService {
  constructor(
    @inject('GuestsRepository')
    private guestsRepository: IGuestsRepository,
  ) {}

  public async execute({
    event_id,
    first_name,
    last_name,
  }: IRequest): Promise<void> {
    const guest = await this.guestsRepository.findByEventFirstNameAndLastName(
      event_id,
      first_name,
      last_name,
    );

    if (!guest) {
      throw new AppError('Guest not found.');
    }

    await this.guestsRepository.delete(guest);
  }
}

export default DeleteGuestService;
