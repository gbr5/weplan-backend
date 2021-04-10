import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUserConfirmationRepository from '@modules/users/repositories/IUserConfirmationRepository';
import IUserManagementModulesRepository from '@modules/users/repositories/IUserManagementModulesRepository';
import IUserDTO from '@modules/events/dtos/IUserDTO';
import CompanyEmployee from '../infra/typeorm/entities/CompanyEmployee';

interface IEmployee {
  id: string;
  position: string;
  access_key: string;
  email: string;
  isActive: boolean;
  name: string;
  employee_id: string;
  company: IUserDTO;
  employee: IUserDTO;
  // modules: IModule[];
  // confirmation: IConfirmation;
}

@injectable()
class ListUserCompanyEmployeeService {
  constructor(
    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,

    @inject('UserConfirmationRepository')
    private userConfirmationRepository: IUserConfirmationRepository,

    @inject('UserManagementModulesRepository')
    private userManagementModulesRepository: IUserManagementModulesRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(company_id: string): Promise<CompanyEmployee[]> {
    const companyEmployees = await this.companyEmployeesRepository.findByCompanyId(
      company_id,
    );

    return companyEmployees;
  }
}

export default ListUserCompanyEmployeeService;
