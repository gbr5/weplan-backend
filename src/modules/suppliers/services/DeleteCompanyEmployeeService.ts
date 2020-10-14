import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';

@injectable()
class UpdateCompanyEmployeeService {
  constructor(
    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const companyEmployee = await this.companyEmployeesRepository.findById(id);

    if (!companyEmployee) {
      throw new AppError('No supplier found, within this category.');
    }

    await this.companyEmployeesRepository.delete(companyEmployee);
  }
}

export default UpdateCompanyEmployeeService;
