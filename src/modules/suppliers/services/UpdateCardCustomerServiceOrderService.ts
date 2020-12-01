import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICardCustomerServiceOrdersRepository from '@modules/suppliers/repositories/ICardCustomerServiceOrdersRepository';

import CardCustomerServiceOrder from '@modules/suppliers/infra/typeorm/entities/CardCustomerServiceOrder';

@injectable()
class UpdateCardCustomerServiceOrderService {
  constructor(
    @inject('CardCustomerServiceOrdersRepository')
    private cardCustomerServiceOrdersRepository: ICardCustomerServiceOrdersRepository,
  ) {}

  public async execute(
    id: string,
    card_unique_name: string,
  ): Promise<CardCustomerServiceOrder> {
    const cardCustomerServiceOrder = await this.cardCustomerServiceOrdersRepository.findById(
      id,
    );

    if (!cardCustomerServiceOrder) {
      throw new AppError('CardCustomerServiceOrder not found.');
    }

    cardCustomerServiceOrder.card_unique_name = card_unique_name;

    const updatedCardCustomerServiceOrder = await this.cardCustomerServiceOrdersRepository.save(
      cardCustomerServiceOrder,
    );

    return updatedCardCustomerServiceOrder;
  }
}

export default UpdateCardCustomerServiceOrderService;
