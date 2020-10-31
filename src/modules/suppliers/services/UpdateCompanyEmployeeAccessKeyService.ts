import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';

import CompanyEmployee from '@modules/suppliers/infra/typeorm/entities/CompanyEmployee';

interface IRequest {
  id: string;
  access_key: string;
}

@injectable()
class UpdateCompanyEmployeeAccessKeyService {
  constructor(
    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute({ id, access_key }: IRequest): Promise<CompanyEmployee> {
    const companyEmployee = await this.companyEmployeesRepository.findById(id);

    if (!companyEmployee) {
      throw new AppError('CompanyEmployees not found.');
    }

    companyEmployee.access_key = access_key;

    const updatedCompanyEmployees = await this.companyEmployeesRepository.save(
      companyEmployee,
    );

    return updatedCompanyEmployees;
  }
}

export default UpdateCompanyEmployeeAccessKeyService;
