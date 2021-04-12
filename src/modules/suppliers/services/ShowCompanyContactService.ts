import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import CompanyContact from '@modules/suppliers/infra/typeorm/entities/CompanyContact';
import ICompanyContactsRepository from '@modules/suppliers/repositories/ICompanyContactsRepository';

@injectable()
class ShowCompanyContactService {
  constructor(
    @inject('CompanyContactsRepository')
    private companyContactsRepository: ICompanyContactsRepository,
  ) {}

  public async execute(id: string): Promise<CompanyContact | undefined> {
    const companyContact = await this.companyContactsRepository.findById(id);

    return companyContact;
  }
}

export default ShowCompanyContactService;
