import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import CompanyEmployee from '@modules/suppliers/infra/typeorm/entities/CompanyEmployee';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListUserAsEmployeeService {
  constructor(
    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(employee_id: string): Promise<CompanyEmployee[]> {
    const userAsEmployee = await this.companyEmployeesRepository.findByEmployeeId(
      employee_id,
    );

    return userAsEmployee;
  }
}

export default ListUserAsEmployeeService;
