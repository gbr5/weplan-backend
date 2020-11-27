import { injectable, inject } from 'tsyringe';

import ICardParticipantsRepository from '@modules/suppliers/repositories/ICardParticipantsRepository';

import CardParticipant from '@modules/suppliers/infra/typeorm/entities/CardParticipant';

@injectable()
class ListCardParticipantsService {
  constructor(
    @inject('CardParticipantsRepository')
    private cardParticipantsRepository: ICardParticipantsRepository,
  ) {}

  public async execute(card_unique_name: string): Promise<CardParticipant[]> {
    const notes = await this.cardParticipantsRepository.findByCard(
      card_unique_name,
    );

    return notes;
  }
}

export default ListCardParticipantsService;
