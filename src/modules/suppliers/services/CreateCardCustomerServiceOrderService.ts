import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICardCustomerServiceOrdersRepository from '../repositories/ICardCustomerServiceOrdersRepository';
import IStageCardsRepository from '../repositories/IStageCardsRepository';
import ICreateCardCustomerServiceOrderDTO from '../dtos/ICreateCardCustomerServiceOrderDTO';
import CardCustomerServiceOrder from '../infra/typeorm/entities/CardCustomerServiceOrder';
import ICustomerServiceOrdersRepository from '../repositories/ICustomerServiceOrdersRepository';

@injectable()
class CreateCardCustomerServiceOrderService {
  constructor(
    @inject('CardCustomerServiceOrdersRepository')
    private cardCustomersRepository: ICardCustomerServiceOrdersRepository,

    @inject('CustomerServiceOrdersRepository')
    private customerServiceOrdersRepository: ICustomerServiceOrdersRepository,

    @inject('StageCardsRepository')
    private stageCardsRepository: IStageCardsRepository,
  ) {}

  public async execute({
    customer_service_order_id,
    card_unique_name,
  }: ICreateCardCustomerServiceOrderDTO): Promise<CardCustomerServiceOrder> {
    const cardExists = await this.stageCardsRepository.findByUniqueName(
      card_unique_name,
    );

    if (!cardExists) {
      throw new AppError('Card not found.');
    }

    const customerServiceOrderExists = await this.customerServiceOrdersRepository.findById(
      customer_service_order_id,
    );
    if (!customerServiceOrderExists) {
      throw new AppError('Customer service order not found.');
    }

    const cardCustomerExists = await this.cardCustomersRepository.findByCustomerServiceOrderIdAndCardUniqueName(
      {
        customer_service_order_id,
        card_unique_name,
      },
    );

    if (cardCustomerExists) {
      throw new AppError(
        'This customer service order is already alocated to a card.',
      );
    }

    const cardCustomer = await this.cardCustomersRepository.create({
      customer_service_order_id,
      card_unique_name,
    });

    return cardCustomer;
  }
}

export default CreateCardCustomerServiceOrderService;
