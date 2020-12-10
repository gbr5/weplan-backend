import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IWeplanGuestsRepository from '@modules/events/repositories/IWeplanGuestsRepository';

@injectable()
class DeleteWeplanGuestService {
  constructor(
    @inject('WeplanGuestsRepository')
    private weplanGuestsRepository: IWeplanGuestsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const guest = await this.weplanGuestsRepository.findById(id);

    if (!guest) {
      throw new AppError('WeplanGuest not found.');
    }

    await this.weplanGuestsRepository.delete(guest);
  }
}

export default DeleteWeplanGuestService;
