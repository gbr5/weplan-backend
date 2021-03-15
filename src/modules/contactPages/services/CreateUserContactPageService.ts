import { injectable, inject } from 'tsyringe';

import UserContactPage from '@modules/contactPages/infra/typeorm/entities/UserContactPage';
import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserContactPageDTO from '../dtos/ICreateUserContactPageDTO';

@injectable()
class CreateUserContactPageService {
  constructor(
    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    slug,
    user_id,
    image_url,
    title,
    cta_label,
    cta_url,
    isActive,
  }: ICreateUserContactPageDTO): Promise<UserContactPage> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.');
    }

    const userContactPage = await this.userContactPagesRepository.findByUserIdAndSlug(
      {
        slug,
        user_id,
      },
    );

    if (userContactPage) {
      throw new AppError(
        'A page with the same slug already exists. Try another one!',
      );
    }

    const contactPage = await this.userContactPagesRepository.create({
      user_id,
      slug,
      image_url,
      title,
      cta_label,
      cta_url,
      isActive,
    });

    return contactPage;
  }
}

export default CreateUserContactPageService;
