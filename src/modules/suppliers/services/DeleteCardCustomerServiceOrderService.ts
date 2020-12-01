import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICardCustomerServiceOrdersRepository from '@modules/suppliers/repositories/ICardCustomerServiceOrdersRepository';

@injectable()
class DeleteCardCustomerServiceOrderService {
  constructor(
    @inject('CardCustomerServiceOrdersRepository')
    private cardCustomerServiceOrdersRepository: ICardCustomerServiceOrdersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const cardCustomerServiceOrder = await this.cardCustomerServiceOrdersRepository.findById(
      id,
    );

    if (!cardCustomerServiceOrder) {
      throw new AppError('Event card relation not found.');
    }

    await this.cardCustomerServiceOrdersRepository.delete(
      cardCustomerServiceOrder,
    );
  }
}

export default DeleteCardCustomerServiceOrderService;
