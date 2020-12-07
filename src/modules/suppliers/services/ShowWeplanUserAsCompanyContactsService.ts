import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import CompanyContactWeplanUser from '@modules/suppliers/infra/typeorm/entities/CompanyContactWeplanUser';
import ICompanyContactWeplanUsersRepository from '@modules/suppliers/repositories/ICompanyContactWeplanUsersRepository';

@injectable()
class ShowWeplanUserAsCompanyContactsService {
  constructor(
    @inject('CompanyContactWeplanUsersRepository')
    private companyContactWeplanUsersRepository: ICompanyContactWeplanUsersRepository,
  ) {}

  public async execute(
    user_id: string,
    company_id: string,
  ): Promise<CompanyContactWeplanUser | undefined> {
    const companyContactWeplanUser = await this.companyContactWeplanUsersRepository.findByUserId(
      user_id,
    );

    const companyWPContact = companyContactWeplanUser.find(
      wp => wp.companyContact.company_id === company_id,
    );

    return companyWPContact;
  }
}

export default ShowWeplanUserAsCompanyContactsService;
