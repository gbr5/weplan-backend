import { getRepository, Repository } from 'typeorm';

import ICardBudgetInstallmentsRepository from '@modules/suppliers/repositories/ICardBudgetInstallmentsRepository';
import ICreateCardBudgetInstallmentDTO from '@modules/suppliers/dtos/ICreateCardBudgetInstallmentDTO';
import CardBudgetInstallment from '@modules/suppliers/infra/typeorm/entities/CardBudgetInstallment';

class CardBudgetInstallmentsRepository
  implements ICardBudgetInstallmentsRepository {
  private ormRepository: Repository<CardBudgetInstallment>;

  constructor() {
    this.ormRepository = getRepository(CardBudgetInstallment);
  }

  public async findByCardBudget(
    card_budget_id: string,
  ): Promise<CardBudgetInstallment[]> {
    const findCardBudgetInstallments = await this.ormRepository.find({
      where: { card_budget_id },
    });

    return findCardBudgetInstallments;
  }

  public async findById(
    id: string,
  ): Promise<CardBudgetInstallment | undefined> {
    const findCardBudgetInstallment = await this.ormRepository.findOne(id);

    return findCardBudgetInstallment;
  }

  public async create(
    data: ICreateCardBudgetInstallmentDTO,
  ): Promise<CardBudgetInstallment> {
    const card = this.ormRepository.create(data);

    await this.ormRepository.save(card);

    return card;
  }

  public async save(
    data: CardBudgetInstallment,
  ): Promise<CardBudgetInstallment> {
    return this.ormRepository.save(data);
  }

  public async delete({ id }: CardBudgetInstallment): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }
}

export default CardBudgetInstallmentsRepository;
