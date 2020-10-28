import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';

import CompanyEmployee from '@modules/suppliers/infra/typeorm/entities/CompanyEmployee';

interface IRequest {
  id: string;
  position: string;
  isActive: boolean;
  email: string;
}

@injectable()
class UpdateCompanyEmployeesService {
  constructor(
    @inject('CompanyEmployeesRepository')
    private CompanyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute({
    id,
    position,
    isActive,
    email,
  }: IRequest): Promise<CompanyEmployee> {
    const companyEmployee = await this.CompanyEmployeesRepository.findById(id);

    if (!companyEmployee) {
      throw new AppError('CompanyEmployees not found.');
    }
    companyEmployee.position = position;
    companyEmployee.isActive = isActive;
    companyEmployee.email = email;

    const updatedCompanyEmployees = await this.CompanyEmployeesRepository.save(
      companyEmployee,
    );

    return updatedCompanyEmployees;
  }
}

export default UpdateCompanyEmployeesService;
