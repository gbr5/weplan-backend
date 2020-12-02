import { getRepository, Repository } from 'typeorm';

import ICardCustomerServiceOrdersRepository from '@modules/suppliers/repositories/ICardCustomerServiceOrdersRepository';
import ICreateCardCustomerServiceOrderDTO from '@modules/suppliers/dtos/ICreateCardCustomerServiceOrderDTO';
import CardCustomerServiceOrder from '@modules/suppliers/infra/typeorm/entities/CardCustomerServiceOrder';

class CardCustomerServiceOrdersRepository
  implements ICardCustomerServiceOrdersRepository {
  private ormRepository: Repository<CardCustomerServiceOrder>;

  constructor() {
    this.ormRepository = getRepository(CardCustomerServiceOrder);
  }

  public async findByCard(
    card_unique_name: string,
  ): Promise<CardCustomerServiceOrder[]> {
    const findCardCustomerServiceOrders = await this.ormRepository.find({
      where: { card_unique_name },
    });

    return findCardCustomerServiceOrders;
  }

  public async findByCustomerServiceOrderIdAndCardUniqueName({
    customer_service_order_id,
    card_unique_name,
  }: ICreateCardCustomerServiceOrderDTO): Promise<
    CardCustomerServiceOrder | undefined
  > {
    const findCardCustomerServiceOrder = await this.ormRepository.findOne({
      where: { customer_service_order_id, card_unique_name },
    });

    return findCardCustomerServiceOrder;
  }

  public async findById(
    id: string,
  ): Promise<CardCustomerServiceOrder | undefined> {
    const findCardCustomerServiceOrder = await this.ormRepository.findOne(id);

    return findCardCustomerServiceOrder;
  }

  public async create(
    data: ICreateCardCustomerServiceOrderDTO,
  ): Promise<CardCustomerServiceOrder> {
    const card = this.ormRepository.create(data);

    await this.ormRepository.save(card);

    return card;
  }

  public async save(
    card: CardCustomerServiceOrder,
  ): Promise<CardCustomerServiceOrder> {
    return this.ormRepository.save(card);
  }

  public async delete({ id }: CardCustomerServiceOrder): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }
}

export default CardCustomerServiceOrdersRepository;
