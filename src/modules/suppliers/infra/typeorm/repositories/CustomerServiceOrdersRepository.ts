import { getRepository, Repository } from 'typeorm';

import ICustomerServiceOrdersRepository from '@modules/suppliers/repositories/ICustomerServiceOrdersRepository';
import ICreateCustomerServiceOrderDTO from '@modules/suppliers/dtos/ICreateCustomerServiceOrderDTO';

import CustomerServiceOrder from '@modules/suppliers/infra/typeorm/entities/CustomerServiceOrder';
import AppError from '@shared/errors/AppError';

class CustomerServiceOrdersRepository
  implements ICustomerServiceOrdersRepository {
  private ormRepository: Repository<CustomerServiceOrder>;

  constructor() {
    this.ormRepository = getRepository(CustomerServiceOrder);
  }

  public async findByCompanyId(
    company_id: string,
  ): Promise<CustomerServiceOrder[]> {
    const findCustomerServiceOrder = await this.ormRepository.find({
      where: { company_id },
    });

    return findCustomerServiceOrder;
  }

  public async findByCustomerId(
    customer_id: string,
  ): Promise<CustomerServiceOrder[]> {
    const findCustomerServiceOrder = await this.ormRepository.find({
      where: { customer_id },
    });

    return findCustomerServiceOrder;
  }

  public async findById(id: string): Promise<CustomerServiceOrder | undefined> {
    const companyContact = await this.ormRepository.findOne(id);

    return companyContact;
  }

  public async create(
    data: ICreateCustomerServiceOrderDTO,
  ): Promise<CustomerServiceOrder> {
    try {
      const companyEmployee = this.ormRepository.create(data);

      await this.ormRepository.save(companyEmployee);

      return companyEmployee;
    } catch (err) {
      throw new AppError(
        'Algo deu errado, CustomerServiceOrdersRepository.create',
        err,
      );
    }
  }

  public async save(
    companyContact: CustomerServiceOrder,
  ): Promise<CustomerServiceOrder> {
    return this.ormRepository.save(companyContact);
  }

  public async delete(companyContact: CustomerServiceOrder): Promise<void> {
    try {
      await this.ormRepository.delete(companyContact.id);
    } catch (err) {
      throw new AppError(
        'Algo deu errado, CustomerServiceOrdersRepository.delete',
      );
    }
  }
}

export default CustomerServiceOrdersRepository;
