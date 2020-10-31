import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';

import CompanyEmployee from '@modules/suppliers/infra/typeorm/entities/CompanyEmployee';

interface IRequest {
  id: string;
  password: string;
}

@injectable()
class UpdateCompanyEmployeePasswordService {
  constructor(
    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute({ id, password }: IRequest): Promise<CompanyEmployee> {
    const companyEmployee = await this.companyEmployeesRepository.findById(id);

    if (!companyEmployee) {
      throw new AppError('CompanyEmployees not found.');
    }

    companyEmployee.password = password;

    const updatedCompanyEmployees = await this.companyEmployeesRepository.save(
      companyEmployee,
    );

    return updatedCompanyEmployees;
  }
}

export default UpdateCompanyEmployeePasswordService;
