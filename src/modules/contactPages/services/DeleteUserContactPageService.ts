import { injectable, inject } from 'tsyringe';

import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import AppError from '@shared/errors/AppError';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';

@injectable()
class UpdateUserContactPageService {
  constructor(
    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,

    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute(id: string, user_id: string): Promise<void> {
    const employee = await this.companyEmployeesRepository.findById(user_id);
    if (!employee) {
      throw new AppError('User not found.');
    }

    const userContactPage = await this.userContactPagesRepository.findById(id);

    if (!userContactPage) {
      throw new AppError('Contact page not found.');
    }

    if (employee.company_id !== userContactPage.user_id) {
      throw new AppError('User not found.');
    }

    await this.userContactPagesRepository.delete(id);
  }
}

export default UpdateUserContactPageService;
