import { injectable, inject } from 'tsyringe';

import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IContactPageLinksRepository from '../repositories/IContactPageLinksRepository';
import ContactPageLink from '../infra/typeorm/entities/ContactPageLink';

interface IRequest {
  user_id: string;
  contact_page_id: string;
  label: string;
  url: string;
  text_color: string;
  background_color: string;
  position: number;
  isActive: boolean;
}

@injectable()
class CreateContactPageLinkService {
  constructor(
    @inject('ContactPageLinksRepository')
    private contactPageLinksRepository: IContactPageLinksRepository,

    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    contact_page_id,
    label,
    url,
    text_color,
    background_color,
    position,
    isActive,
  }: IRequest): Promise<ContactPageLink> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    const userContactPage = await this.userContactPagesRepository.findById(
      contact_page_id,
    );

    if (!userContactPage) {
      throw new AppError('Contact page not found!');
    }

    if (user.id !== userContactPage.user_id) {
      throw new AppError('User not found!');
    }

    const contactPageLink = await this.contactPageLinksRepository.create({
      contact_page_id,
      label,
      url,
      text_color,
      background_color,
      position,
      isActive,
    });

    return contactPageLink;
  }
}

export default CreateContactPageLinkService;
