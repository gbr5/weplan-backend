import { injectable, inject } from 'tsyringe';

import ICardOutsideParticipantsRepository from '@modules/suppliers/repositories/ICardOutsideParticipantsRepository';

import CardOutsideParticipant from '@modules/suppliers/infra/typeorm/entities/CardOutsideParticipant';

@injectable()
class ListCardOutsideParticipantsService {
  constructor(
    @inject('CardOutsideParticipantsRepository')
    private cardCustomersRepository: ICardOutsideParticipantsRepository,
  ) {}

  public async execute(
    card_unique_name: string,
  ): Promise<CardOutsideParticipant[]> {
    const notes = await this.cardCustomersRepository.findByCard(
      card_unique_name,
    );

    return notes;
  }
}

export default ListCardOutsideParticipantsService;
