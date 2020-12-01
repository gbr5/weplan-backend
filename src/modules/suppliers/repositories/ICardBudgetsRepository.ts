import CardBudget from '@modules/suppliers/infra/typeorm/entities/CardBudget';
import ICreateCardBudgetDTO from '@modules/suppliers/dtos/ICreateCardBudgetDTO';

export default interface ICardBudgetsRepository {
  create(data: ICreateCardBudgetDTO): Promise<CardBudget>;
  findById(id: string): Promise<CardBudget | undefined>;
  findByCard(card_unique_name: string): Promise<CardBudget[]>;
  findByCustomerId(customer_id: string): Promise<CardBudget[]>;
  findByCompanyId(company_id: string): Promise<CardBudget[]>;
  findBySalesPersonId(
    sales_person_id: string,
    company_id: string,
  ): Promise<CardBudget[]>;
  save(card: CardBudget): Promise<CardBudget>;
  delete(card: CardBudget): Promise<void>;
}
