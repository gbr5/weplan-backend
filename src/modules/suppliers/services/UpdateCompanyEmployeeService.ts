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
    private companyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute({
    id,
    position,
    isActive,
    email,
  }: IRequest): Promise<CompanyEmployee> {
    const companyEmployee = await this.companyEmployeesRepository.findById(id);

    if (!companyEmployee) {
      throw new AppError('CompanyEmployees not found.');
    }

    const employeeEmail = await this.companyEmployeesRepository.findByEmail(
      email,
    );

    if (employeeEmail && employeeEmail.email !== companyEmployee.email) {
      throw new AppError('This email is already associated with another user.');
    }

    companyEmployee.position = position;
    companyEmployee.isActive = isActive;
    companyEmployee.email = email;

    const updatedCompanyEmployees = await this.companyEmployeesRepository.save(
      companyEmployee,
    );

    return updatedCompanyEmployees;
  }
}

export default UpdateCompanyEmployeesService;
