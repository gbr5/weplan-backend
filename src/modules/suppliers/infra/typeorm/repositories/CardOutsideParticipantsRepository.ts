import { getRepository, Repository } from 'typeorm';

import ICardOutsideParticipantsRepository from '@modules/suppliers/repositories/ICardOutsideParticipantsRepository';
import ICreateCardOutsideParticipantDTO from '@modules/suppliers/dtos/ICreateCardOutsideParticipantDTO';
import CardOutsideParticipant from '@modules/suppliers/infra/typeorm/entities/CardOutsideParticipant';

class CardOutsideParticipantsRepository
  implements ICardOutsideParticipantsRepository {
  private ormRepository: Repository<CardOutsideParticipant>;

  constructor() {
    this.ormRepository = getRepository(CardOutsideParticipant);
  }

  public async findByCard(
    card_unique_name: string,
  ): Promise<CardOutsideParticipant[]> {
    const findCardOutsideParticipants = await this.ormRepository.find({
      where: { card_unique_name },
    });

    return findCardOutsideParticipants;
  }

  public async findByContactCard(
    contact_card_unique_name: string,
  ): Promise<CardOutsideParticipant[]> {
    const findCardOutsideParticipants = await this.ormRepository.find({
      where: { contact_card_unique_name },
    });

    return findCardOutsideParticipants;
  }

  public async findByCompanyContactId(
    company_contact_id: string,
  ): Promise<CardOutsideParticipant[]> {
    const findCardOutsideParticipants = await this.ormRepository.find({
      where: { company_contact_id },
    });

    return findCardOutsideParticipants;
  }

  public async findById(
    id: string,
  ): Promise<CardOutsideParticipant | undefined> {
    const findCardOutsideParticipant = await this.ormRepository.findOne(id);

    return findCardOutsideParticipant;
  }

  public async create(
    data: ICreateCardOutsideParticipantDTO,
  ): Promise<CardOutsideParticipant> {
    const card = this.ormRepository.create(data);

    await this.ormRepository.save(card);

    return card;
  }

  public async save(
    data: CardOutsideParticipant,
  ): Promise<CardOutsideParticipant> {
    return this.ormRepository.save(data);
  }

  public async delete({ id }: CardOutsideParticipant): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }
}

export default CardOutsideParticipantsRepository;
