import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CompanyEmployee from '@modules/suppliers/infra/typeorm/entities/CompanyEmployee';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IWeplanManagementModulesRepository from '@modules/weplan/repositories/IWeplanManagementModulesRepository';

interface IModulesDTO {
  management_module_id: string;
  access_level: number;
}

interface IRequest {
  employee_id: string;
  company_id: string;
  position: string;
  modules: IModulesDTO[];
  request_message: string;
  salary: number;
}

@injectable()
class CreateCompanyEmployeeService {
  constructor(
    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('WeplanManagementModulesRepository')
    private weplanManagementModulesRepository: IWeplanManagementModulesRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    employee_id,
    company_id,
    position,
    modules,
    request_message,
    salary,
  }: IRequest): Promise<CompanyEmployee> {
    try {
      const companyEmployeeExists = await this.companyEmployeesRepository.findByEmployeeIdAndCompanyId(
        employee_id,
        company_id,
      );

      if (companyEmployeeExists) {
        throw new AppError(
          `${employee_id} is already registered to ${company_id}.`,
        );
      }

      const employee = await this.usersRepository.findById(employee_id);
      const company = await this.usersRepository.findById(company_id);

      if (!employee) {
        throw new AppError("Employee's user not found");
      }
      if (!company) {
        throw new AppError("Employee's user not found");
      }

      const modulesIDs = modules.map(thisModule => {
        return { id: thisModule.management_module_id };
      });

      const modulesItems = await this.weplanManagementModulesRepository.findAllById(
        modulesIDs,
      );

      if (modulesItems.length !== modules.length) {
        throw new AppError('Module Missing');
      }

      const modulesList = modulesItems.map(moduleItem => {
        const moduleList = modules.find(
          moduleFind => moduleFind.management_module_id === moduleItem.id,
        );

        if (!moduleList) {
          throw new AppError(`Module ${moduleItem.name} not found.`);
        }

        return {
          management_module_id: moduleItem.id,
          access_level: moduleList.access_level,
        };
      });

      const companyEmployee = await this.companyEmployeesRepository.create({
        employee,
        company,
        position,
        modules: modulesList,
        confirmation: {
          request_message,
          isConfirmed: false,
          salary,
        },
      });

      return companyEmployee;
    } catch (err) {
      throw new AppError(err);
    }
  }
}

export default CreateCompanyEmployeeService;
