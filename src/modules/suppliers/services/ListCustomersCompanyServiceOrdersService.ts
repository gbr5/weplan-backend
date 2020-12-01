import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ICustomerServiceOrdersRepository from '@modules/suppliers/repositories/ICustomerServiceOrdersRepository';
import CustomerServiceOrder from '../infra/typeorm/entities/CustomerServiceOrder';

@injectable()
class ListCustomersCompanyServiceOrdersService {
  constructor(
    @inject('CustomerServiceOrdersRepository')
    private customerServiceOrdersRepository: ICustomerServiceOrdersRepository,
  ) {}

  public async execute(company_id: string): Promise<CustomerServiceOrder[]> {
    const customerServiceOrders = await this.customerServiceOrdersRepository.findByCompanyId(
      company_id,
    );

    return customerServiceOrders;
  }
}

export default ListCustomersCompanyServiceOrdersService;
