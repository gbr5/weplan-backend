import { getRepository, Repository } from 'typeorm';

import ICustomerServiceOrderFieldAnswersRepository from '@modules/suppliers/repositories/ICustomerServiceOrderFieldAnswersRepository';
import ICreateCustomerServiceOrderFieldAnswerDTO from '@modules/suppliers/dtos/ICreateCustomerServiceOrderFieldAnswerDTO';

import CustomerServiceOrderFieldAnswer from '@modules/suppliers/infra/typeorm/entities/CustomerServiceOrderFieldAnswer';
import AppError from '@shared/errors/AppError';

class CustomerServiceOrderFieldAnswersRepository
  implements ICustomerServiceOrderFieldAnswersRepository {
  private ormRepository: Repository<CustomerServiceOrderFieldAnswer>;

  constructor() {
    this.ormRepository = getRepository(CustomerServiceOrderFieldAnswer);
  }

  public async findByCompanyDefaultServiceOrderFieldAndCustomerServiceOrder(
    company_default_service_order_field_id: string,
    customer_service_order_id: string,
  ): Promise<CustomerServiceOrderFieldAnswer | undefined> {
    const findCustomerServiceOrderFieldAnswer = await this.ormRepository.findOne(
      {
        where: {
          company_default_service_order_field_id,
          customer_service_order_id,
        },
      },
    );

    return findCustomerServiceOrderFieldAnswer;
  }

  public async findByCustomerServiceOrderId(
    customer_service_order_id: string,
  ): Promise<CustomerServiceOrderFieldAnswer[]> {
    const findCustomerServiceOrderFieldAnswer = await this.ormRepository.find({
      where: { customer_service_order_id },
    });

    return findCustomerServiceOrderFieldAnswer;
  }

  public async findById(
    id: string,
  ): Promise<CustomerServiceOrderFieldAnswer | undefined> {
    const companyContact = await this.ormRepository.findOne(id);

    return companyContact;
  }

  public async create(
    data: ICreateCustomerServiceOrderFieldAnswerDTO,
  ): Promise<CustomerServiceOrderFieldAnswer> {
    try {
      const companyEmployee = this.ormRepository.create(data);

      await this.ormRepository.save(companyEmployee);

      return companyEmployee;
    } catch (err) {
      throw new AppError(
        'Algo deu errado, CustomerServiceOrderFieldAnswersRepository.create',
        err,
      );
    }
  }

  public async save(
    companyContact: CustomerServiceOrderFieldAnswer,
  ): Promise<CustomerServiceOrderFieldAnswer> {
    return this.ormRepository.save(companyContact);
  }

  public async delete(
    companyContact: CustomerServiceOrderFieldAnswer,
  ): Promise<void> {
    try {
      await this.ormRepository.delete(companyContact.id);
    } catch (err) {
      throw new AppError(
        'Algo deu errado, CustomerServiceOrderFieldAnswersRepository.delete',
      );
    }
  }
}

export default CustomerServiceOrderFieldAnswersRepository;
