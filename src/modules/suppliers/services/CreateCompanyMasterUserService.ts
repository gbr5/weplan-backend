import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CompanyMasterUser from '@modules/suppliers/infra/typeorm/entities/CompanyMasterUser';
import ICompanyMasterUsersRepository from '@modules/suppliers/repositories/ICompanyMasterUsersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  user_id: string;
  company_id: string;
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
  ) {}

  public async execute({
    user_id,
    company_id,
  }: IRequest): Promise<CompanyMasterUser> {
    try {
      const companyMasterUserExists = await this.companyMasterUsersRepository.findByUserIdAndCompanyId(
        user_id,
        company_id,
      );

      if (companyMasterUserExists) {
        throw new AppError(
          `${user_id} is already registered to ${company_id}.`,
        );
      }

      const user = await this.usersRepository.findById(user_id);
      const company = await this.usersRepository.findById(company_id);

      if (!user) {
        throw new AppError("User's user not found");
      }
      if (!company) {
        throw new AppError("User's user not found");
      }

      const companyMasterUser = await this.companyMasterUsersRepository.create({
        user_id,
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
