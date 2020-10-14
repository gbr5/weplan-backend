import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';

import CompanyEmployee from '@modules/suppliers/infra/typeorm/entities/CompanyEmployee';

interface IRequest {
  id: string;
  position: string;
}

@injectable()
class UpdateCompanyEmployeesService {
  constructor(
    @inject('CompanyEmployeesRepository')
    private CompanyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute({ id, position }: IRequest): Promise<CompanyEmployee> {
    const companyEmployees = await this.CompanyEmployeesRepository.findById(id);

    if (!companyEmployees) {
      throw new AppError('CompanyEmployees not found.');
    }
    companyEmployees.position = position;

    const updatedCompanyEmployees = await this.CompanyEmployeesRepository.save(
      companyEmployees,
    );

    return updatedCompanyEmployees;
  }
}

export default UpdateCompanyEmployeesService;
