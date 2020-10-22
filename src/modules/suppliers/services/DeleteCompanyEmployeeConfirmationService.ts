import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyEmployeeConfirmationRepository from '@modules/suppliers/repositories/ICompanyEmployeeConfirmationRepository';

@injectable()
class DeleteCompanyEmployeeConfirmationService {
  constructor(
    @inject('CompanyEmployeeConfirmationRepository')
    private companyEmployeeConfirmationRepository: ICompanyEmployeeConfirmationRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const companyEmployee = await this.companyEmployeeConfirmationRepository.findById(
      id,
    );

    if (!companyEmployee) {
      throw new AppError('No employee found, within this company.');
    }

    await this.companyEmployeeConfirmationRepository.delete(companyEmployee);
  }
}

export default DeleteCompanyEmployeeConfirmationService;
