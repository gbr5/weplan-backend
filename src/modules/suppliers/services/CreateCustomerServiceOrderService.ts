import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CustomerServiceOrder from '@modules/suppliers/infra/typeorm/entities/CustomerServiceOrder';
import ICustomerServiceOrdersRepository from '@modules/suppliers/repositories/ICustomerServiceOrdersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateCustomerServiceOrderDTO from '../dtos/ICreateCustomerServiceOrderDTO';
import ICompanyContactsRepository from '../repositories/ICompanyContactsRepository';

@injectable()
class CreateCustomerServiceOrderService {
  constructor(
    @inject('CustomerServiceOrdersRepository')
    private customerServiceOrdersRepository: ICustomerServiceOrdersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CompanyContactsRepository')
    private companyContactsRepository: ICompanyContactsRepository,
  ) {}

  public async execute({
    customer_id,
    company_id,
    title,
    message,
    isResponded,
  }: ICreateCustomerServiceOrderDTO): Promise<CustomerServiceOrder> {
    try {
      const companyExists = await this.usersRepository.findById(company_id);

      if (!companyExists) {
        throw new AppError('Company not found!');
      }

      const customerExists = await this.companyContactsRepository.findById(
        customer_id,
      );

      if (!customerExists) {
        throw new AppError('Customer not found!');
      }

      const companyServiceOrder = await this.customerServiceOrdersRepository.create(
        {
          customer_id,
          company_id,
          title,
          message,
          isResponded,
        },
      );

      return companyServiceOrder;
    } catch (err) {
      throw new AppError(err);
    }
  }
}

export default CreateCustomerServiceOrderService;
