import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyMasterUsersRepository from '@modules/suppliers/repositories/ICompanyMasterUsersRepository';

import CompanyMasterUser from '@modules/suppliers/infra/typeorm/entities/CompanyMasterUser';

interface IRequest {
  id: string;
  isConfirmed: boolean;
  email: string;
}

@injectable()
class UpdateCompanyMasterUsersService {
  constructor(
    @inject('CompanyMasterUsersRepository')
    private companyMasterUsersRepository: ICompanyMasterUsersRepository,
  ) {}

  public async execute({
    id,
    isConfirmed,
    email,
  }: IRequest): Promise<CompanyMasterUser> {
    const companyMasterUser = await this.companyMasterUsersRepository.findById(
      id,
    );

    if (!companyMasterUser) {
      throw new AppError('CompanyMasterUsers not found.');
    }

    const masterEmail = await this.companyMasterUsersRepository.findByEmail(
      email,
    );

    if (masterEmail && masterEmail.email !== companyMasterUser.email) {
      throw new AppError('This email is already associated with another user.');
    }
    companyMasterUser.isConfirmed = isConfirmed;
    companyMasterUser.email = email;

    const updatedCompanyMasterUser = await this.companyMasterUsersRepository.save(
      companyMasterUser,
    );

    return updatedCompanyMasterUser;
  }
}

export default UpdateCompanyMasterUsersService;
