import { injectable, inject } from 'tsyringe';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import ICardBudgetsRepository from '../repositories/ICardBudgetsRepository';
import IStageCardsRepository from '../repositories/IStageCardsRepository';
import ICreateCardBudgetDTO from '../dtos/ICreateCardBudgetDTO';
import CardBudget from '../infra/typeorm/entities/CardBudget';
import ICompanyContactsRepository from '../repositories/ICompanyContactsRepository';

@injectable()
class CreateCardBudgetService {
  constructor(
    @inject('CardBudgetsRepository')
    private cardBudgetsRepository: ICardBudgetsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CompanyContactsRepository')
    private CompanyContactsRepository: ICompanyContactsRepository,

    @inject('StageCardsRepository')
    private stageCardsRepository: IStageCardsRepository,
  ) {}

  public async execute({
    customer_id,
    sales_person_id,
    company_id,
    card_unique_name,
    description,
    value,
    validity_date,
    number_of_installments,
    isValid,
  }: ICreateCardBudgetDTO): Promise<CardBudget> {
    const cardExists = await this.stageCardsRepository.findByUniqueName(
      card_unique_name,
    );

    if (!cardExists) {
      throw new AppError('Card not found.');
    }

    const customerExists = await this.CompanyContactsRepository.findById(
      customer_id,
    );

    if (!customerExists) {
      throw new AppError('Customer not found.');
    }

    const companyExists = await this.usersRepository.findById(company_id);

    if (!companyExists) {
      throw new AppError('Company not found.');
    }

    const salesPersonExists = await this.usersRepository.findById(company_id);

    if (!salesPersonExists) {
      throw new AppError('SalesPerson not found.');
    }

    const card = await this.cardBudgetsRepository.create({
      customer_id,
      sales_person_id,
      company_id,
      card_unique_name,
      description,
      value,
      validity_date,
      number_of_installments,
      isValid,
    });

    return card;
  }
}

export default CreateCardBudgetService;
