import { getRepository, Repository } from 'typeorm';

import ICardCustomersRepository from '@modules/suppliers/repositories/ICardCustomersRepository';
import ICreateCardCustomerDTO from '@modules/suppliers/dtos/ICreateCardCustomerDTO';
import CardCustomer from '@modules/suppliers/infra/typeorm/entities/CardCustomer';

class CardCustomersRepository implements ICardCustomersRepository {
  private ormRepository: Repository<CardCustomer>;

  constructor() {
    this.ormRepository = getRepository(CardCustomer);
  }

  public async findByCard(card_unique_name: string): Promise<CardCustomer[]> {
    const findCardCustomers = await this.ormRepository.find({
      where: { card_unique_name },
    });

    return findCardCustomers;
  }

  public async findByCustomerId(user_id: string): Promise<CardCustomer[]> {
    const findCardCustomers = await this.ormRepository.find({
      where: { user_id },
    });

    return findCardCustomers;
  }

  public async findByCustomerIdAndCardUniqueName({
    customer_id,
    card_unique_name,
  }: ICreateCardCustomerDTO): Promise<CardCustomer | undefined> {
    const findCardCustomer = await this.ormRepository.findOne({
      where: { customer_id, card_unique_name },
    });

    return findCardCustomer;
  }

  public async findById(id: string): Promise<CardCustomer | undefined> {
    const findCardCustomer = await this.ormRepository.findOne(id);

    return findCardCustomer;
  }

  public async create(data: ICreateCardCustomerDTO): Promise<CardCustomer> {
    const card = this.ormRepository.create(data);

    await this.ormRepository.save(card);

    return card;
  }

  public async save(card: CardCustomer): Promise<CardCustomer> {
    return this.ormRepository.save(card);
  }

  public async delete({ id }: CardCustomer): Promise<void> {
    await this.ormRepository.delete({
      id,
    });
  }
}

export default CardCustomersRepository;
