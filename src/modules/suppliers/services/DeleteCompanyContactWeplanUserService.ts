import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyContactWeplanUsersRepository from '@modules/suppliers/repositories/ICompanyContactWeplanUsersRepository';

@injectable()
class DeleteCompanyContactWeplanUserService {
  constructor(
    @inject('CompanyContactWeplanUsersRepository')
    private companyContactWeplanUsersRepository: ICompanyContactWeplanUsersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const companyContactWeplanUser = await this.companyContactWeplanUsersRepository.findById(
      id,
    );

    if (!companyContactWeplanUser) {
      throw new AppError('No supplier found, within this category.');
    }

    await this.companyContactWeplanUsersRepository.delete(
      companyContactWeplanUser,
    );
  }
}

export default DeleteCompanyContactWeplanUserService;
