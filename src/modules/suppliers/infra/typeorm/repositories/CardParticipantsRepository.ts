import { getRepository, Repository } from 'typeorm';

import ICardParticipantsRepository from '@modules/suppliers/repositories/ICardParticipantsRepository';
import ICreateCardParticipantDTO from '@modules/suppliers/dtos/ICreateCardParticipantDTO';
import CardParticipant from '@modules/suppliers/infra/typeorm/entities/CardParticipant';

class CardParticipantsRepository implements ICardParticipantsRepository {
  private ormRepository: Repository<CardParticipant>;

  constructor() {
    this.ormRepository = getRepository(CardParticipant);
  }

  public async findByCard(
    card_unique_name: string,
  ): Promise<CardParticipant[]> {
    const findCardParticipants = await this.ormRepository.find({
      where: { card_unique_name },
    });

    return findCardParticipants;
  }

  public async findByUserId(user_id: string): Promise<CardParticipant[]> {
    const findCardParticipants = await this.ormRepository.find({
      where: { user_id },
    });

    return findCardParticipants;
  }

  public async findByUserIdAndCardUniqueName({
    user_id,
    card_unique_name,
  }: ICreateCardParticipantDTO): Promise<CardParticipant | undefined> {
    const findCardParticipant = await this.ormRepository.findOne({
      where: { user_id, card_unique_name },
    });

    return findCardParticipant;
  }

  public async findById(id: string): Promise<CardParticipant | undefined> {
    const findCardParticipant = await this.ormRepository.findOne(id);

    return findCardParticipant;
  }

  public async create({
    user_id,
    card_unique_name,
  }: ICreateCardParticipantDTO): Promise<CardParticipant> {
    const card = this.ormRepository.create({
      user_id,
      card_unique_name,
    });

    await this.ormRepository.save(card);

    return card;
  }

  public async save(card: CardParticipant): Promise<CardParticipant> {
    return this.ormRepository.save(card);
  }

  public async delete({ id }: CardParticipant): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }
}

export default CardParticipantsRepository;
