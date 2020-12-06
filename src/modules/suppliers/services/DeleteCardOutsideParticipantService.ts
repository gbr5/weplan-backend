import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICardOutsideParticipantsRepository from '@modules/suppliers/repositories/ICardOutsideParticipantsRepository';

@injectable()
class DeleteCardOutsideParticipantService {
  constructor(
    @inject('CardOutsideParticipantsRepository')
    private cardCustomersRepository: ICardOutsideParticipantsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const cardCustomer = await this.cardCustomersRepository.findById(id);

    if (!cardCustomer) {
      throw new AppError('Event card relation not found.');
    }

    await this.cardCustomersRepository.delete(cardCustomer);
  }
}

export default DeleteCardOutsideParticipantService;
