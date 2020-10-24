import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyMasterUsersRepository from '@modules/suppliers/repositories/ICompanyMasterUsersRepository';

@injectable()
class DeleteCompanyMasterUserService {
  constructor(
    @inject('CompanyMasterUsersRepository')
    private companyMasterUsersRepository: ICompanyMasterUsersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const companyMasterUser = await this.companyMasterUsersRepository.findById(
      id,
    );

    if (!companyMasterUser) {
      throw new AppError('No supplier found, within this category.');
    }

    await this.companyMasterUsersRepository.delete(companyMasterUser);
  }
}

export default DeleteCompanyMasterUserService;
