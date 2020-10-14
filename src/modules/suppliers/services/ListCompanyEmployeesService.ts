import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import CompanyEmployee from '@modules/suppliers/infra/typeorm/entities/CompanyEmployee';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListUserCompanyEmployeeService {
  constructor(
    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(company_id: string): Promise<CompanyEmployee[]> {
    const companyEmployee = await this.companyEmployeesRepository.findByCompanyId(
      company_id,
    );

    return companyEmployee;
  }
}

export default ListUserCompanyEmployeeService;
