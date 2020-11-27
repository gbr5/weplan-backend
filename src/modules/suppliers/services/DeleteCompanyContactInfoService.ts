import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyContactInfosRepository from '@modules/suppliers/repositories/ICompanyContactInfosRepository';

@injectable()
class DeleteCompanyContactInfoService {
  constructor(
    @inject('CompanyContactInfosRepository')
    private companyContactInfosRepository: ICompanyContactInfosRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const companyContactInfo = await this.companyContactInfosRepository.findById(
      id,
    );

    if (!companyContactInfo) {
      throw new AppError('No supplier found, within this category.');
    }

    await this.companyContactInfosRepository.delete(companyContactInfo);
  }
}

export default DeleteCompanyContactInfoService;
