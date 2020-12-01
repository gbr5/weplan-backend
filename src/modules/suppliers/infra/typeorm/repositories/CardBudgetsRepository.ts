import { getRepository, Repository } from 'typeorm';

import ICardBudgetsRepository from '@modules/suppliers/repositories/ICardBudgetsRepository';
import ICreateCardBudgetDTO from '@modules/suppliers/dtos/ICreateCardBudgetDTO';
import CardBudget from '@modules/suppliers/infra/typeorm/entities/CardBudget';

class CardBudgetsRepository implements ICardBudgetsRepository {
  private ormRepository: Repository<CardBudget>;

  constructor() {
    this.ormRepository = getRepository(CardBudget);
  }

  public async findByCard(card_unique_name: string): Promise<CardBudget[]> {
    const findCardBudgets = await this.ormRepository.find({
      where: { card_unique_name },
    });

    return findCardBudgets;
  }

  public async findByCustomerId(customer_id: string): Promise<CardBudget[]> {
    const findCardBudgets = await this.ormRepository.find({
      where: { customer_id },
    });

    return findCardBudgets;
  }

  public async findByCompanyId(company_id: string): Promise<CardBudget[]> {
    const findCardBudgets = await this.ormRepository.find({
      where: { company_id },
    });

    return findCardBudgets;
  }

  public async findBySalesPersonId(
    sales_person_id: string,
    company_id: string,
  ): Promise<CardBudget[]> {
    const findCardBudgets = await this.ormRepository.find({
      where: { sales_person_id, company_id },
    });

    return findCardBudgets;
  }

  public async findById(id: string): Promise<CardBudget | undefined> {
    const findCardBudget = await this.ormRepository.findOne(id);

    return findCardBudget;
  }

  public async create(data: ICreateCardBudgetDTO): Promise<CardBudget> {
    const card = this.ormRepository.create(data);

    await this.ormRepository.save(card);

    return card;
  }

  public async save(data: CardBudget): Promise<CardBudget> {
    return this.ormRepository.save(data);
  }

  public async delete({ id }: CardBudget): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }
}

export default CardBudgetsRepository;
