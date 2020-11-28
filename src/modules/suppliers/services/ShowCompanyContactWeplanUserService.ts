import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import CompanyContactWeplanUser from '@modules/suppliers/infra/typeorm/entities/CompanyContactWeplanUser';
import ICompanyContactWeplanUsersRepository from '@modules/suppliers/repositories/ICompanyContactWeplanUsersRepository';

@injectable()
class ShowCompanyContactWeplanUserService {
  constructor(
    @inject('CompanyContactWeplanUsersRepository')
    private companyContactWeplanUsersRepository: ICompanyContactWeplanUsersRepository,
  ) {}

  public async execute(
    company_contact_id: string,
  ): Promise<CompanyContactWeplanUser | undefined> {
    const companyContactWeplanUser = await this.companyContactWeplanUsersRepository.findByCompanyContactId(
      company_contact_id,
    );

    return companyContactWeplanUser;
  }
}

export default ShowCompanyContactWeplanUserService;
