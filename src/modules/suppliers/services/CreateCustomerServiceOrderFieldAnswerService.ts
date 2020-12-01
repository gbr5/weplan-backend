import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CustomerServiceOrderFieldAnswer from '@modules/suppliers/infra/typeorm/entities/CustomerServiceOrderFieldAnswer';
import ICustomerServiceOrderFieldAnswersRepository from '@modules/suppliers/repositories/ICustomerServiceOrderFieldAnswersRepository';
import ICreateCustomerServiceOrderFieldAnswerDTO from '../dtos/ICreateCustomerServiceOrderFieldAnswerDTO';
import ICompanyDefaultServiceOrderFieldsRepository from '../repositories/ICompanyDefaultServiceOrderFieldsRepository';
import ICustomerServiceOrdersRepository from '../repositories/ICustomerServiceOrdersRepository';

@injectable()
class CreateCustomerServiceOrderFieldAnswerService {
  constructor(
    @inject('CustomerServiceOrderFieldAnswersRepository')
    private customerServiceOrderFieldAnswersRepository: ICustomerServiceOrderFieldAnswersRepository,

    @inject('CompanyDefaultServiceOrderFieldsRepository')
    private companyDefaultServiceOrderFieldsRepository: ICompanyDefaultServiceOrderFieldsRepository,

    @inject('CustomerServiceOrdersRepository')
    private customerServiceOrdersRepository: ICustomerServiceOrdersRepository,
  ) {}

  public async execute({
    company_default_service_order_field_id,
    customer_service_order_id,
    answer,
  }: ICreateCustomerServiceOrderFieldAnswerDTO): Promise<
    CustomerServiceOrderFieldAnswer
  > {
    try {
      const companyDefaultServiceOrderFieldExists = await this.companyDefaultServiceOrderFieldsRepository.findById(
        company_default_service_order_field_id,
      );

      if (!companyDefaultServiceOrderFieldExists) {
        throw new AppError('Company default service order field not found!');
      }

      const customerServiceOrderExists = await this.customerServiceOrdersRepository.findById(
        customer_service_order_id,
      );

      if (!customerServiceOrderExists) {
        throw new AppError('Customer service order not found!');
      }

      const companyServiceOrder = await this.customerServiceOrderFieldAnswersRepository.create(
        {
          company_default_service_order_field_id,
          customer_service_order_id,
          answer,
        },
      );

      return companyServiceOrder;
    } catch (err) {
      throw new AppError(err);
    }
  }
}

export default CreateCustomerServiceOrderFieldAnswerService;
