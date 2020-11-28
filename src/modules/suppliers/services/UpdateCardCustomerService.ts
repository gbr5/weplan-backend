import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICardCustomersRepository from '@modules/suppliers/repositories/ICardCustomersRepository';

import CardCustomer from '@modules/suppliers/infra/typeorm/entities/CardCustomer';

@injectable()
class UpdateCardCustomerService {
  constructor(
    @inject('CardCustomersRepository')
    private cardCustomersRepository: ICardCustomersRepository,
  ) {}

  public async execute(id: string, description: string): Promise<CardCustomer> {
    console.log(id, description);
    const cardCustomer = await this.cardCustomersRepository.findById(id);

    if (!cardCustomer) {
      throw new AppError('CardCustomer not found.');
    }

    cardCustomer.description = description;

    const updatedCardCustomer = await this.cardCustomersRepository.save(
      cardCustomer,
    );

    return updatedCardCustomer;
  }
}

export default UpdateCardCustomerService;
