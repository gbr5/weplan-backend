import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CompanyMasterUser from '@modules/suppliers/infra/typeorm/entities/CompanyMasterUser';
import ICompanyMasterUsersRepository from '@modules/suppliers/repositories/ICompanyMasterUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/hashProviders/models/IHashProvider';

interface IRequest {
  user_id: string;
  company_id: string;
  email: string;
  password: string;
}

@injectable()
class CreateCompanyMasterUserService {
  constructor(
    @inject('CompanyMasterUsersRepository')
    private companyMasterUsersRepository: ICompanyMasterUsersRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    company_id,
    email,
    password,
  }: IRequest): Promise<CompanyMasterUser> {
    try {
      const user = await this.usersRepository.findById(user_id);
      const company = await this.usersRepository.findById(company_id);

      if (!user) {
        throw new AppError("User's user not found");
      }
      if (!company) {
        throw new AppError("User's user not found");
      }

      const companyMasterUserExists = await this.companyMasterUsersRepository.findByUserIdAndCompanyId(
        user_id,
        company_id,
      );

      if (companyMasterUserExists) {
        throw new AppError(
          `${user_id} is already registered to ${company_id}.`,
        );
      }

      const emailRegistered = await this.companyMasterUsersRepository.findByEmail(
        email,
      );

      if (emailRegistered) {
        throw new AppError(`${email} is already registered to ${company_id}.`);
      }

      const hashedPassword = await this.hashProvider.generateHash(password);

      const companyMasterUser = await this.companyMasterUsersRepository.create({
        user_id,
        email,
        password: hashedPassword,
        company_id,
        isConfirmed: false,
      });

      return companyMasterUser;
    } catch (err) {
      throw new AppError(err);
    }
  }
}

export default CreateCompanyMasterUserService;
