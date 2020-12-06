import { injectable, inject } from 'tsyringe';

import ICardOutsideParticipantsRepository from '@modules/suppliers/repositories/ICardOutsideParticipantsRepository';

import CardOutsideParticipant from '@modules/suppliers/infra/typeorm/entities/CardOutsideParticipant';

@injectable()
class ListContactCardOutsideParticipantsService {
  constructor(
    @inject('CardOutsideParticipantsRepository')
    private cardOutsideParticipantsRepository: ICardOutsideParticipantsRepository,
  ) {}

  public async execute(
    contact_card_unique_name: string,
  ): Promise<CardOutsideParticipant[]> {
    const contactCardOutsideParticipants = await this.cardOutsideParticipantsRepository.findByContactCard(
      contact_card_unique_name,
    );

    return contactCardOutsideParticipants;
  }
}

export default ListContactCardOutsideParticipantsService;
