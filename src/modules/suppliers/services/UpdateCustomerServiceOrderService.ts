import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICustomerServiceOrdersRepository from '@modules/suppliers/repositories/ICustomerServiceOrdersRepository';

import CustomerServiceOrder from '@modules/suppliers/infra/typeorm/entities/CustomerServiceOrder';

interface IRequest {
  id: string;
  isResponded: boolean;
}

@injectable()
class UpdateCustomerServiceOrderDescriptionService {
  constructor(
    @inject('CustomerServiceOrdersRepository')
    private customerServiceOrdersRepository: ICustomerServiceOrdersRepository,
  ) {}

  public async execute({
    id,
    isResponded,
  }: IRequest): Promise<CustomerServiceOrder> {
    const customerServiceOrder = await this.customerServiceOrdersRepository.findById(
      id,
    );

    if (!customerServiceOrder) {
      throw new AppError('CustomerServiceOrders not found.');
    }

    customerServiceOrder.isResponded = isResponded;

    const updatedCustomerServiceOrders = await this.customerServiceOrdersRepository.save(
      customerServiceOrder,
    );

    return updatedCustomerServiceOrders;
  }
}

export default UpdateCustomerServiceOrderDescriptionService;
