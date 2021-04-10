import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ICompanyEmployeeContactRepository from '@modules/suppliers/repositories/ICompanyEmployeeContactRepository';
import CompanyEmployeeContact from '../infra/typeorm/entities/CompanyEmployeeContact';

@injectable()
class ShowCompanyEmployeeContactService {
  constructor(
    @inject('CompanyEmployeeContactRepository')
    private companyContactRepository: ICompanyEmployeeContactRepository,
  ) {}

  public async execute(
    company_contact_id: string,
  ): Promise<CompanyEmployeeContact | undefined> {
    const companyContact = await this.companyContactRepository.findByCompanyContactId(
      company_contact_id,
    );

    return companyContact;
  }
}

export default ShowCompanyEmployeeContactService;
