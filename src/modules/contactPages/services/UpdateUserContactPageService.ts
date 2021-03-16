import { injectable, inject } from 'tsyringe';

import UserContactPage from '@modules/contactPages/infra/typeorm/entities/UserContactPage';
import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

interface IRequest {
  id: string;
  user_id: string;
  slug: string;
  image_url: string;
  title: string;
  cta_label: string;
  cta_url: string;
  isActive: boolean;
}

@injectable()
class UpdateUserContactPageService {
  constructor(
    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    id,
    user_id,
    slug,
    image_url,
    title,
    cta_label,
    cta_url,
    isActive,
  }: IRequest): Promise<UserContactPage> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('User not found.');
    }

    const userContactPage = await this.userContactPagesRepository.findById(id);

    if (!userContactPage) {
      throw new AppError('Contact page not found.');
    }

    if (user_id !== userContactPage.user_id || user.id !== user_id) {
      throw new AppError('User not found.');
    }

    if (userContactPage.slug !== slug) {
      const slugExists = await this.userContactPagesRepository.findByUserIdAndSlug(
        {
          slug,
          user_id,
        },
      );

      if (slugExists) {
        throw new AppError('This slug already exists.');
      }
      userContactPage.slug = slug;
    }

    userContactPage.image_url = image_url;
    userContactPage.title = title;
    userContactPage.cta_label = cta_label;
    userContactPage.cta_url = cta_url;
    userContactPage.isActive = isActive;

    const contactPage = await this.userContactPagesRepository.save(
      userContactPage,
    );

    return contactPage;
  }
}

export default UpdateUserContactPageService;
