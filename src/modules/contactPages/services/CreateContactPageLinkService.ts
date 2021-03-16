import { injectable, inject } from 'tsyringe';

import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import AppError from '@shared/errors/AppError';
import IContactPageLinksRepository from '../repositories/IContactPageLinksRepository';
import ContactPageLink from '../infra/typeorm/entities/ContactPageLink';
import ICreateContactPageLinkDTO from '../dtos/ICreateContactPageLinkDTO';

interface IRequest extends ICreateContactPageLinkDTO {
  user_id: string;
}

@injectable()
class CreateContactPageLinkService {
  constructor(
    @inject('ContactPageLinksRepository')
    private contactPageLinksRepository: IContactPageLinksRepository,

    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,
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
    const userContactPage = await this.userContactPagesRepository.findById(
      contact_page_id,
    );

    if (!userContactPage) {
      throw new AppError('Contact page not found!');
    }

    if (user_id !== userContactPage.user_id) {
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
