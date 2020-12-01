import CardCustomerServiceOrder from '@modules/suppliers/infra/typeorm/entities/CardCustomerServiceOrder';
import ICreateCardCustomerServiceOrderDTO from '@modules/suppliers/dtos/ICreateCardCustomerServiceOrderDTO';

export default interface ICardCustomerServiceOrdersRepository {
  create(
    data: ICreateCardCustomerServiceOrderDTO,
  ): Promise<CardCustomerServiceOrder>;
  findById(id: string): Promise<CardCustomerServiceOrder | undefined>;
  findByCard(card_unique_name: string): Promise<CardCustomerServiceOrder[]>;
  findByCustomerServiceOrderIdAndCardUniqueName(
    data: ICreateCardCustomerServiceOrderDTO,
  ): Promise<CardCustomerServiceOrder | undefined>;
  save(card: CardCustomerServiceOrder): Promise<CardCustomerServiceOrder>;
  delete(card: CardCustomerServiceOrder): Promise<void>;
}
