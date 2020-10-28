import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CompanyEmployee from '@modules/suppliers/infra/typeorm/entities/CompanyEmployee';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserConfirmationRepository from '@modules/users/repositories/IUserConfirmationRepository';

interface IModulesDTO {
  management_module: string;
  access_level: number;
}
interface IRequest {
  access_key: string;
  password: string;
  title: string;
  message: string;
  employee_id: string;
  company_id: string;
  receiver_id: string;
  sender_id: string;
  position: string;
  modules: IModulesDTO[];
}

@injectable()
class CreateCompanyEmployeeService {
  constructor(
    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserConfirmationRepository')
    private userConfirmationsRepository: IUserConfirmationRepository,
  ) {}

  public async execute({
    access_key,
    password,
    title,
    message,
    employee_id,
    company_id,
    receiver_id,
    sender_id,
    position,
    modules,
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

      console.log('service create employee', {
        employee,
        company,
        access_key,
        password,
        position,
        confirmation: {
          receiver_id,
          sender_id,
          title,
          message,
          isConfirmed: false,
        },
      });

      const companyEmployee = await this.companyEmployeesRepository.create({
        employee,
        company,
        isActive: false,
        access_key,
        password,
        position,
        modules,
      });

      await this.userConfirmationsRepository.create({
        isConfirmed: false,
        message,
        receiver_id,
        sender_id,
        title,
      });

      return companyEmployee;
    } catch (err) {
      throw new AppError(err);
    }
  }
}

export default CreateCompanyEmployeeService;
