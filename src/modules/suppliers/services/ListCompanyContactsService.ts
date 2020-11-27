import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ICompanyContactsRepository from '@modules/suppliers/repositories/ICompanyContactsRepository';
import CompanyContact from '../infra/typeorm/entities/CompanyContact';

@injectable()
class ListCompanyContactsService {
  constructor(
    @inject('CompanyContactsRepository')
    private companyContactsRepository: ICompanyContactsRepository,
  ) {}

  public async execute(company_id: string): Promise<CompanyContact[]> {
    const companyContacts = await this.companyContactsRepository.findByCompanyId(
      company_id,
    );

    return companyContacts;
  }
}

export default ListCompanyContactsService;
