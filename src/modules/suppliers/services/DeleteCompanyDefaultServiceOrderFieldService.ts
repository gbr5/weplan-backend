import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyDefaultServiceOrderFieldsRepository from '@modules/suppliers/repositories/ICompanyDefaultServiceOrderFieldsRepository';

@injectable()
class DeleteCompanyDefaultServiceOrderFieldService {
  constructor(
    @inject('CompanyDefaultServiceOrderFieldsRepository')
    private companyContactsRepository: ICompanyDefaultServiceOrderFieldsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const companyContact = await this.companyContactsRepository.findById(id);

    if (!companyContact) {
      throw new AppError('No supplier found, within this category.');
    }

    await this.companyContactsRepository.delete(companyContact);
  }
}

export default DeleteCompanyDefaultServiceOrderFieldService;
