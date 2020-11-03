import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CompanyEmployee from '@modules/suppliers/infra/typeorm/entities/CompanyEmployee';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IUserConfirmationRepository from '@modules/users/repositories/IUserConfirmationRepository';
import IHashProvider from '@modules/users/providers/hashProviders/models/IHashProvider';

// interface IModulesDTO {
//   management_module: string;
//   access_level: number;
// }
interface IRequest {
  access_key: string;
  password: string;
  title: string;
  email: string;
  message: string;
  employee_id: string;
  company_id: string;
  sender_id: string;
  position: string;
  // modules: IModulesDTO[];
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

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    access_key,
    password,
    title,
    email,
    message,
    employee_id,
    company_id,
    sender_id,
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

      const employee = await this.usersRepository.findById(employee_id);
      const company = await this.usersRepository.findById(company_id);

      if (!employee) {
        throw new AppError("Employee's user not found");
      }
      if (employee.isCompany) {
        throw new AppError(
          'It is not possible to add a company as an employee',
        );
      }
      if (!company) {
        throw new AppError("Company's user not found");
      }

      const hashedPassword = await this.hashProvider.generateHash(password);

      const companyEmployee = await this.companyEmployeesRepository.create({
        position,
        access_key,
        email,
        password: hashedPassword,
        isActive: false,
        employee,
        company,
      });

      await this.userConfirmationsRepository.create({
        isConfirmed: false,
        message,
        receiver_id: companyEmployee.id,
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
