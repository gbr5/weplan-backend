import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CompanyEmployeeConfirmation from '@modules/suppliers/infra/typeorm/entities/CompanyEmployeeConfirmation';
import ICompanyEmployeeConfirmationRepository from '@modules/suppliers/repositories/ICompanyEmployeeConfirmationRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  company_employee_id: string;
  request_message: string;
  isConfirmed: boolean;
  salary: number;
}

@injectable()
class CreateCompanyEmployeeConfirmationConfirmation {
  constructor(
    @inject('CompanyEmployeeConfirmationRepository')
    private companyEmployeesRepository: ICompanyEmployeeConfirmationRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    company_employee_id,
    request_message,
    isConfirmed,
    salary,
  }: IRequest): Promise<CompanyEmployeeConfirmation> {
    try {
      const companyEmployeeExists = await this.companyEmployeesRepository.findByCompanyEmployeeId(
        company_employee_id,
      );

      if (companyEmployeeExists) {
        throw new AppError(
          `${company_employee_id} confirmation already exists.`,
        );
      }

      const companyEmployeeConfirmation = await this.companyEmployeesRepository.create(
        {
          company_employee_id,
          request_message,
          isConfirmed,
          salary,
        },
      );

      return companyEmployeeConfirmation;
    } catch (err) {
      throw new AppError(err);
    }
  }
}

export default CreateCompanyEmployeeConfirmationConfirmation;
