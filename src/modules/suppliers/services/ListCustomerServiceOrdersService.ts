import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ICustomerServiceOrdersRepository from '@modules/suppliers/repositories/ICustomerServiceOrdersRepository';
import CustomerServiceOrder from '../infra/typeorm/entities/CustomerServiceOrder';

@injectable()
class ListCustomerServiceOrdersService {
  constructor(
    @inject('CustomerServiceOrdersRepository')
    private customerServiceOrdersRepository: ICustomerServiceOrdersRepository,
  ) {}

  public async execute(customer_id: string): Promise<CustomerServiceOrder[]> {
    const customerServiceOrders = await this.customerServiceOrdersRepository.findByCustomerId(
      customer_id,
    );

    return customerServiceOrders;
  }
}

export default ListCustomerServiceOrdersService;
