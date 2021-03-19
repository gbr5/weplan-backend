import { injectable, inject } from 'tsyringe';

import UserForm from '@modules/forms/infra/typeorm/entities/UserForm';
import IUserFormsRepository from '@modules/forms/repositories/IUserFormsRepository';
import AppError from '@shared/errors/AppError';
import ICompanyEmployeesRepository from '@modules/suppliers/repositories/ICompanyEmployeesRepository';
import ICreateUserFormDTO from '../dtos/ICreateUserFormDTO';

@injectable()
class CreateUserFormService {
  constructor(
    @inject('UserFormsRepository')
    private userFormsRepository: IUserFormsRepository,

    @inject('CompanyEmployeesRepository')
    private companyEmployeesRepository: ICompanyEmployeesRepository,
  ) {}

  public async execute({
    slug,
    user_id,
    name,
    title,
    message,
    isActive,
  }: ICreateUserFormDTO): Promise<UserForm> {
    const employee = await this.companyEmployeesRepository.findById(user_id);
    console.log(employee);

    if (!employee) {
      throw new AppError('User not found.');
    }

    const userForm = await this.userFormsRepository.findByUserIdAndSlug({
      slug,
      user_id: employee.company_id,
    });

    if (userForm) {
      throw new AppError(
        'A page with the same slug already exists. Try another one!',
      );
    }

    const form = await this.userFormsRepository.create({
      user_id: employee.company_id,
      slug,
      name,
      title,
      message,
      isActive,
    });

    return form;
  }
}

export default CreateUserFormService;
