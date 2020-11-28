import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICardCustomersRepository from '@modules/suppliers/repositories/ICardCustomersRepository';

@injectable()
class DeleteCardCustomerService {
  constructor(
    @inject('CardCustomersRepository')
    private cardCustomersRepository: ICardCustomersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const cardCustomer = await this.cardCustomersRepository.findById(id);

    if (!cardCustomer) {
      throw new AppError('Event card relation not found.');
    }

    await this.cardCustomersRepository.delete(cardCustomer);
  }
}

export default DeleteCardCustomerService;
