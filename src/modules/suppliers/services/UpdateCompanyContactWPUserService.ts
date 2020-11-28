import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyContactWeplanUsersRepository from '@modules/suppliers/repositories/ICompanyContactWeplanUsersRepository';

import CompanyContactWeplanUser from '@modules/suppliers/infra/typeorm/entities/CompanyContactWeplanUser';

@injectable()
class UpdateCompanyContactWPUserService {
  constructor(
    @inject('CompanyContactWeplanUsersRepository')
    private companyContactsRepository: ICompanyContactWeplanUsersRepository,
  ) {}

  public async execute(
    id: string,
    user_id: string,
  ): Promise<CompanyContactWeplanUser> {
    const companyContact = await this.companyContactsRepository.findById(id);

    if (!companyContact) {
      throw new AppError('CompanyContactWeplanUsers not found.');
    }

    companyContact.user_id = user_id;

    const updatedCompanyContactWeplanUsers = await this.companyContactsRepository.save(
      companyContact,
    );

    return updatedCompanyContactWeplanUsers;
  }
}

export default UpdateCompanyContactWPUserService;
