import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CompanyDefaultServiceOrderField from '@modules/suppliers/infra/typeorm/entities/CompanyDefaultServiceOrderField';
import ICompanyDefaultServiceOrderFieldsRepository from '@modules/suppliers/repositories/ICompanyDefaultServiceOrderFieldsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateCompanyDefaultServiceOrderFieldDTO from '../dtos/ICreateCompanyDefaultServiceOrderFieldDTO';

@injectable()
class CreateCompanyDefaultServiceOrderFieldService {
  constructor(
    @inject('CompanyDefaultServiceOrderFieldsRepository')
    private customerServiceOrdersRepository: ICompanyDefaultServiceOrderFieldsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    company_id,
    field_name,
    field_type,
    isRequired,
  }: ICreateCompanyDefaultServiceOrderFieldDTO): Promise<
    CompanyDefaultServiceOrderField
  > {
    try {
      const companyExists = await this.usersRepository.findById(company_id);

      if (!companyExists || !companyExists.isCompany) {
        throw new AppError('Company not found!');
      }

      const defaultServiceORderFieldExists = await this.customerServiceOrdersRepository.findByCompanyIdAndFieldName(
        company_id,
        field_name,
      );

      if (defaultServiceORderFieldExists) {
        throw new AppError('Field already exists!');
      }

      const companyServiceOrder = await this.customerServiceOrdersRepository.create(
        {
          company_id,
          field_name,
          field_type,
          isRequired,
        },
      );

      return companyServiceOrder;
    } catch (err) {
      throw new AppError(err);
    }
  }
}

export default CreateCompanyDefaultServiceOrderFieldService;
