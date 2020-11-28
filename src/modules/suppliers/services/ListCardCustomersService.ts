import { injectable, inject } from 'tsyringe';

import ICardCustomersRepository from '@modules/suppliers/repositories/ICardCustomersRepository';

import CardCustomer from '@modules/suppliers/infra/typeorm/entities/CardCustomer';

@injectable()
class ListCardCustomersService {
  constructor(
    @inject('CardCustomersRepository')
    private cardCustomersRepository: ICardCustomersRepository,
  ) {}

  public async execute(card_unique_name: string): Promise<CardCustomer[]> {
    const notes = await this.cardCustomersRepository.findByCard(
      card_unique_name,
    );

    return notes;
  }
}

export default ListCardCustomersService;
