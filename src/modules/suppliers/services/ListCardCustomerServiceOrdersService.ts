import { injectable, inject } from 'tsyringe';

import ICardCustomerServiceOrdersRepository from '@modules/suppliers/repositories/ICardCustomerServiceOrdersRepository';

import CardCustomerServiceOrder from '@modules/suppliers/infra/typeorm/entities/CardCustomerServiceOrder';

@injectable()
class ListCardCustomerServiceOrdersService {
  constructor(
    @inject('CardCustomerServiceOrdersRepository')
    private cardCustomerServiceOrdersRepository: ICardCustomerServiceOrdersRepository,
  ) {}

  public async execute(
    card_unique_name: string,
  ): Promise<CardCustomerServiceOrder[]> {
    const cardCustomerServiceOrders = await this.cardCustomerServiceOrdersRepository.findByCard(
      card_unique_name,
    );

    return cardCustomerServiceOrders;
  }
}

export default ListCardCustomerServiceOrdersService;
