import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICustomerServiceOrdersRepository from '@modules/suppliers/repositories/ICustomerServiceOrdersRepository';

@injectable()
class DeleteCustomerServiceOrderService {
  constructor(
    @inject('CustomerServiceOrdersRepository')
    private customerServiceOrdersRepository: ICustomerServiceOrdersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const customerServiceOrder = await this.customerServiceOrdersRepository.findById(
      id,
    );

    if (!customerServiceOrder) {
      throw new AppError('No service order found.');
    }

    await this.customerServiceOrdersRepository.delete(customerServiceOrder);
  }
}

export default DeleteCustomerServiceOrderService;
