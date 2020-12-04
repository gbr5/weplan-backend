import CardBudgetInstallment from '@modules/suppliers/infra/typeorm/entities/CardBudgetInstallment';
import ICreateCardBudgetInstallmentDTO from '@modules/suppliers/dtos/ICreateCardBudgetInstallmentDTO';

export default interface ICardBudgetInstallmentsRepository {
  create(data: ICreateCardBudgetInstallmentDTO): Promise<CardBudgetInstallment>;
  findById(id: string): Promise<CardBudgetInstallment | undefined>;
  findByCardBudget(card_budget_id: string): Promise<CardBudgetInstallment[]>;
  save(card: CardBudgetInstallment): Promise<CardBudgetInstallment>;
  delete(card: CardBudgetInstallment): Promise<void>;
}
