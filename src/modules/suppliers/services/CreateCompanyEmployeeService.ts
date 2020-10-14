import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CompanyEmployee from '@modules/suppliers/infra/typeorm/entities/CompanyEmployee';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  employee_id: string;
  company_id: string;
  position: string;
}

@injectable()
class CreateCompanyEmployeeService {
  constructor(
    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    employee_id,
    company_id,
    position,
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

      const user = await this.usersRepository.findById(employee_id);

      if (!user) {
        throw new AppError('User not found');
      }

      const companyEmployee = await this.companyEmployeesRepository.create({
        employee_id,
        company_id,
        position,
      });

      return companyEmployee;
    } catch (err) {
      throw new AppError(err);
    }
  }
}

export default CreateCompanyEmployeeService;
