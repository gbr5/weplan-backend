import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import CompanyMasterUser from '@modules/suppliers/infra/typeorm/entities/CompanyMasterUser';
import ICompanyMasterUsersRepository from '@modules/suppliers/repositories/ICompanyMasterUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListUserCompanyMastersService {
  constructor(
    @inject('CompanyMasterUsersRepository')
    private companyMasterUsersRepository: ICompanyMasterUsersRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(user_id: string): Promise<CompanyMasterUser[]> {
    const companyMasterUser = await this.companyMasterUsersRepository.findByUserId(
      user_id,
    );

    return companyMasterUser;
  }
}

export default ListUserCompanyMastersService;