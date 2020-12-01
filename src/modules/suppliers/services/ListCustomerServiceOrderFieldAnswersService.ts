import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ICustomerServiceOrderFieldAnswersRepository from '@modules/suppliers/repositories/ICustomerServiceOrderFieldAnswersRepository';
import CustomerServiceOrderFieldAnswer from '../infra/typeorm/entities/CustomerServiceOrderFieldAnswer';

@injectable()
class ListCustomerServiceOrderFieldAnswersService {
  constructor(
    @inject('CustomerServiceOrderFieldAnswersRepository')
    private customerServiceOrdersRepository: ICustomerServiceOrderFieldAnswersRepository,
  ) {}

  public async execute(
    customer_service_order_id: string,
  ): Promise<CustomerServiceOrderFieldAnswer[]> {
    const customerServiceOrders = await this.customerServiceOrdersRepository.findByCustomerServiceOrderId(
      customer_service_order_id,
    );

    return customerServiceOrders;
  }
}

export default ListCustomerServiceOrderFieldAnswersService;
