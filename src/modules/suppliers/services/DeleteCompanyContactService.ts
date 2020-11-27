import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyContactsRepository from '@modules/suppliers/repositories/ICompanyContactsRepository';

@injectable()
class DeleteCompanyContactService {
  constructor(
    @inject('CompanyContactsRepository')
    private companyContactsRepository: ICompanyContactsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const companyContact = await this.companyContactsRepository.findById(id);

    if (!companyContact) {
      throw new AppError('No supplier found, within this category.');
    }

    await this.companyContactsRepository.delete(companyContact);
  }
}

export default DeleteCompanyContactService;
