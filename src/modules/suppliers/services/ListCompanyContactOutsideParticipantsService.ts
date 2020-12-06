import { injectable, inject } from 'tsyringe';

import ICardOutsideParticipantsRepository from '@modules/suppliers/repositories/ICardOutsideParticipantsRepository';

import CardOutsideParticipant from '@modules/suppliers/infra/typeorm/entities/CardOutsideParticipant';

@injectable()
class ListCompanyContactOutsideParticipantsService {
  constructor(
    @inject('CardOutsideParticipantsRepository')
    private cardCustomersRepository: ICardOutsideParticipantsRepository,
  ) {}

  public async execute(
    company_contact_id: string,
  ): Promise<CardOutsideParticipant[]> {
    const notes = await this.cardCustomersRepository.findByCompanyContactId(
      company_contact_id,
    );

    return notes;
  }
}

export default ListCompanyContactOutsideParticipantsService;
