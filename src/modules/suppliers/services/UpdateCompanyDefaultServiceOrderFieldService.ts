import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyDefaultServiceOrderFieldsRepository from '@modules/suppliers/repositories/ICompanyDefaultServiceOrderFieldsRepository';

import CompanyDefaultServiceOrderField from '@modules/suppliers/infra/typeorm/entities/CompanyDefaultServiceOrderField';

interface IRequest {
  id: string;
  field_name: string;
  field_type: string;
  isRequired: boolean;
}

@injectable()
class UpdateCompanyDefaultServiceOrderFieldService {
  constructor(
    @inject('CompanyDefaultServiceOrderFieldsRepository')
    private companyDefaultServiceOrderFieldsRepository: ICompanyDefaultServiceOrderFieldsRepository,
  ) {}

  public async execute({
    id,
    field_name,
    field_type,
    isRequired,
  }: IRequest): Promise<CompanyDefaultServiceOrderField> {
    const companyDefaultServiceOrderField = await this.companyDefaultServiceOrderFieldsRepository.findById(
      id,
    );

    if (!companyDefaultServiceOrderField) {
      throw new AppError('CompanyDefaultServiceOrderField not found.');
    }

    companyDefaultServiceOrderField.field_name = field_name;
    companyDefaultServiceOrderField.field_type = field_type;
    companyDefaultServiceOrderField.isRequired = isRequired;

    const updatedCompanyDefaultServiceOrderField = await this.companyDefaultServiceOrderFieldsRepository.save(
      companyDefaultServiceOrderField,
    );

    return updatedCompanyDefaultServiceOrderField;
  }
}

export default UpdateCompanyDefaultServiceOrderFieldService;
