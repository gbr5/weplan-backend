import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyContactsRepository from '@modules/suppliers/repositories/ICompanyContactsRepository';

import CompanyContact from '@modules/suppliers/infra/typeorm/entities/CompanyContact';

@injectable()
class UpdateCompanyContactWeplanUserService {
  constructor(
    @inject('CompanyContactsRepository')
    private companyContactsRepository: ICompanyContactsRepository,
  ) {}

  public async execute(
    id: string,
    weplanUser: boolean,
  ): Promise<CompanyContact> {
    const companyContact = await this.companyContactsRepository.findById(id);

    if (!companyContact) {
      throw new AppError('CompanyContacts not found.');
    }

    companyContact.weplanUser = weplanUser;

    const updatedCompanyContacts = await this.companyContactsRepository.save(
      companyContact,
    );

    return updatedCompanyContacts;
  }
}

export default UpdateCompanyContactWeplanUserService;
