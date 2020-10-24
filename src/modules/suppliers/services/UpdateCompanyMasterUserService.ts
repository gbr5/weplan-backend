import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyMasterUsersRepository from '@modules/suppliers/repositories/ICompanyMasterUsersRepository';

import CompanyMasterUser from '@modules/suppliers/infra/typeorm/entities/CompanyMasterUser';

interface IRequest {
  id: string;
  isConfirmed: boolean;
}

@injectable()
class UpdateCompanyMasterUsersService {
  constructor(
    @inject('CompanyMasterUsersRepository')
    private CompanyMasterUsersRepository: ICompanyMasterUsersRepository,
  ) {}

  public async execute({
    id,
    isConfirmed,
  }: IRequest): Promise<CompanyMasterUser> {
    const companyMasterUsers = await this.CompanyMasterUsersRepository.findById(
      id,
    );

    if (!companyMasterUsers) {
      throw new AppError('CompanyMasterUsers not found.');
    }
    companyMasterUsers.isConfirmed = isConfirmed;

    const updatedCompanyMasterUsers = await this.CompanyMasterUsersRepository.save(
      companyMasterUsers,
    );

    return updatedCompanyMasterUsers;
  }
}

export default UpdateCompanyMasterUsersService;
