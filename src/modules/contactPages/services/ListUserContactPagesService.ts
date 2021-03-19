import { injectable, inject } from 'tsyringe';

import UserContactPage from '@modules/contactPages/infra/typeorm/entities/UserContactPage';
import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import AppError from '@shared/errors/AppError';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';

@injectable()
class ListUserContactPagesService {
  constructor(
    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,

    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute(user_id: string): Promise<UserContactPage[]> {
    const employee = await this.companyEmployeesRepository.findById(user_id);

    if (!employee) {
      throw new AppError('User not found!');
    }

    const userContactPages = await this.userContactPagesRepository.findByUserId(
      employee.company_id,
    );

    return userContactPages;
  }
}

export default ListUserContactPagesService;
