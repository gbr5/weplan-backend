import CardCustomer from '@modules/suppliers/infra/typeorm/entities/CardCustomer';
import ICreateCardCustomerDTO from '@modules/suppliers/dtos/ICreateCardCustomerDTO';

interface IFindCardCustomerDTO {
  customer_id: string;
  card_unique_name: string;
}

export default interface ICardCustomersRepository {
  create(data: ICreateCardCustomerDTO): Promise<CardCustomer>;
  findById(id: string): Promise<CardCustomer | undefined>;
  findByCard(card_unique_name: string): Promise<CardCustomer[]>;
  findByCustomerId(customer_id: string): Promise<CardCustomer[]>;
  findByCustomerIdAndCardUniqueName(
    data: IFindCardCustomerDTO,
  ): Promise<CardCustomer | undefined>;
  save(card: CardCustomer): Promise<CardCustomer>;
  delete(card: CardCustomer): Promise<void>;
}
