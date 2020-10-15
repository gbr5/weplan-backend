import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import CompanyEmployee from '@modules/suppliers/infra/typeorm/entities/CompanyEmployee';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ShowCompanyEmployeeService {
  constructor(
    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(
    employee_id: string,
  ): Promise<CompanyEmployee | undefined> {
    const companyEmployee = await this.companyEmployeesRepository.findByEmployeeId(
      employee_id,
    );

    return companyEmployee;
  }
}

export default ShowCompanyEmployeeService;
