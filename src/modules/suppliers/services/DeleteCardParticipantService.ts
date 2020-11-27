import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICardParticipantsRepository from '@modules/suppliers/repositories/ICardParticipantsRepository';

@injectable()
class DeleteCardParticipantService {
  constructor(
    @inject('CardParticipantsRepository')
    private cardParticipantsRepository: ICardParticipantsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const cardParticipant = await this.cardParticipantsRepository.findById(id);

    if (!cardParticipant) {
      throw new AppError('Event card relation not found.');
    }

    await this.cardParticipantsRepository.delete(cardParticipant);
  }
}

export default DeleteCardParticipantService;
