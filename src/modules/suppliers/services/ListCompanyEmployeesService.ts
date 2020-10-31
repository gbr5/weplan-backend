import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IUserConfirmationRepository from '@modules/users/repositories/IUserConfirmationRepository';
import IUserManagementModulesRepository from '@modules/users/repositories/IUserManagementModulesRepository';
import IUserDTO from '@modules/events/dtos/IUserDTO';

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

  public async execute(company_id: string): Promise<IEmployee[]> {
    const companyEmployees = await this.companyEmployeesRepository.findByCompanyId(
      company_id,
    );

    const employeeArray = companyEmployees.map(employee => {
      return {
        id: employee.id,
        position: employee.position,
        access_key: employee.access_key,
        email: employee.email,
        isActive: employee.isActive,
        name: employee.employee.name,
        employee_id: employee.employee_id,
        employee: employee.employee,
        company: employee.company,
      };
    });

    return employeeArray;
  }
}

export default ListUserCompanyEmployeeService;
