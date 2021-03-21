import { injectable, inject } from 'tsyringe';

import IUserFormsRepository from '@modules/forms/repositories/IUserFormsRepository';
import AppError from '@shared/errors/AppError';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';

@injectable()
class DeleteUserFormService {
  constructor(
    @inject('UserFormsRepository')
    private userFormsRepository: IUserFormsRepository,

    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute(id: string, user_id: string): Promise<void> {
    const employee = await this.companyEmployeesRepository.findById(user_id);

    if (!employee) {
      throw new AppError('User not found.');
    }

    const userForm = await this.userFormsRepository.findById(id);

    if (!userForm) {
      throw new AppError('Form not found.');
    }

    if (employee.company_id !== userForm.user_id) {
      throw new AppError('User not found.');
    }

    await this.userFormsRepository.delete(id);
  }
}

export default DeleteUserFormService;
