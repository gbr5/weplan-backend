import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import IContactPageFormsRepository from '../repositories/IContactPageFormsRepository';

@injectable()
class DeleteContactPageFormService {
  constructor(
    @inject('ContactPageFormsRepository')
    private contactPageFormsRepository: IContactPageFormsRepository,

    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute(id: string, user_id: string): Promise<void> {
    const employee = await this.companyEmployeesRepository.findById(user_id);

    if (!employee) {
      throw new AppError('User not found!');
    }

    const form = await this.contactPageFormsRepository.findById(id);

    if (!form) {
      throw new AppError('Contact page form not found!');
    }

    if (form.form.user_id !== employee.company_id) {
      throw new AppError('Contact page not found!');
    }

    await this.contactPageFormsRepository.delete(id);
  }
}

export default DeleteContactPageFormService;
