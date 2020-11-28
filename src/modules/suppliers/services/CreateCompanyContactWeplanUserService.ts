import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CompanyContactWeplanUser from '@modules/suppliers/infra/typeorm/entities/CompanyContactWeplanUser';
import ICompanyContactWeplanUsersRepository from '@modules/suppliers/repositories/ICompanyContactWeplanUsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateCompanyContactWeplanUserDTO from '../dtos/ICreateCompanyContactWeplanUserDTO';
import ICompanyContactsRepository from '../repositories/ICompanyContactsRepository';

@injectable()
class CreateCompanyContactWeplanUserService {
  constructor(
    @inject('CompanyContactWeplanUsersRepository')
    private companyContactWeplanUsersRepository: ICompanyContactWeplanUsersRepository,

    @inject('CompanyContactsRepository')
    private companyContactsRepository: ICompanyContactsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    company_contact_id,
    user_id,
  }: ICreateCompanyContactWeplanUserDTO): Promise<CompanyContactWeplanUser> {
    try {
      const userExists = await this.usersRepository.findById(user_id);

      if (!userExists) {
        throw new AppError('User not found');
      }

      const company_contact = await this.companyContactsRepository.findById(
        company_contact_id,
      );

      if (!company_contact) {
        throw new AppError('Contact not found');
      }

      const companyContactExists = await this.companyContactWeplanUsersRepository.findByContactIdAndWeplanUser(
        company_contact_id,
        user_id,
      );

      if (companyContactExists) {
        throw new AppError(
          `This user is already associated with another contact.`,
        );
      }

      const companyContact = await this.companyContactWeplanUsersRepository.create(
        {
          company_contact_id,
          user_id,
        },
      );

      return companyContact;
    } catch (err) {
      throw new AppError(err);
    }
  }
}

export default CreateCompanyContactWeplanUserService;
