import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import CompanyMasterUser from '@modules/suppliers/infra/typeorm/entities/CompanyMasterUser';
import ICompanyMasterUsersRepository from '@modules/suppliers/repositories/ICompanyMasterUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import ICompanyEmployeesRepository from '../repositories/ICompanyEmployeesRepository';

@injectable()
class ShowCompanyMasterUserService {
  constructor(
    @inject('CompanyMasterUsersRepository')
    private companyMasterUsersRepository: ICompanyMasterUsersRepository,

    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(
    user_id: string,
  ): Promise<CompanyMasterUser | undefined> {
    const companyEmployee = await this.companyEmployeesRepository.findById(
      user_id,
    );

    if (!companyEmployee) {
      throw new AppError('This user does exists');
    }
    const companyMasterUser = await this.companyMasterUsersRepository.findByUserIdAndCompanyId(
      companyEmployee.employeeUser.id,
      companyEmployee.company.id,
    );

    return companyMasterUser;
  }
}

export default ShowCompanyMasterUserService;
