import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICardCustomersRepository from '../repositories/ICardCustomersRepository';
import IStageCardsRepository from '../repositories/IStageCardsRepository';
import ICreateCardCustomerDTO from '../dtos/ICreateCardCustomerDTO';
import CardCustomer from '../infra/typeorm/entities/CardCustomer';
import ICompanyContactsRepository from '../repositories/ICompanyContactsRepository';

@injectable()
class CreateCardCustomerService {
  constructor(
    @inject('CardCustomersRepository')
    private cardCustomersRepository: ICardCustomersRepository,

    @inject('CompanyContactsRepository')
    private companyContactsRepository: ICompanyContactsRepository,

    @inject('StageCardsRepository')
    private stageCardsRepository: IStageCardsRepository,
  ) {}

  public async execute({
    customer_id,
    card_unique_name,
    description,
  }: ICreateCardCustomerDTO): Promise<CardCustomer> {
    const cardExists = await this.stageCardsRepository.findByUniqueName(
      card_unique_name,
    );

    if (!cardExists) {
      throw new AppError('Card not found.');
    }

    const userExists = await this.companyContactsRepository.findById(
      customer_id,
    );

    if (!userExists) {
      throw new AppError('User not found.');
    }

    const cardCustomerExists = await this.cardCustomersRepository.findByCustomerIdAndCardUniqueName(
      {
        customer_id,
        card_unique_name,
      },
    );

    if (cardCustomerExists) {
      throw new AppError(
        'This user is already registered as a participant in this card.',
      );
    }

    console.log({
      customer_id,
      card_unique_name,
      description,
    });

    const cardCustomer = await this.cardCustomersRepository.create({
      customer_id,
      card_unique_name,
      description,
    });

    return cardCustomer;
  }
}

export default CreateCardCustomerService;
