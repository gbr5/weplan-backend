import { injectable, inject } from 'tsyringe';

import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import AppError from '@shared/errors/AppError';
import IContactPageLinksRepository from '../repositories/IContactPageLinksRepository';
import ICreateContactPageLinkDTO from '../dtos/ICreateContactPageLinkDTO';
import ContactPageLink from '../infra/typeorm/entities/ContactPageLink';

@injectable()
class CreateContactPageLinkService {
  constructor(
    @inject('ContactPageLinksRepository')
    private contactPageLinksRepository: IContactPageLinksRepository,

    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,
  ) {}

  public async execute({
    contact_page_id,
    label,
    url,
    text_color,
    background_color,
    position,
    isActive,
  }: ICreateContactPageLinkDTO): Promise<ContactPageLink> {
    const userContactPage = await this.userContactPagesRepository.findById(
      contact_page_id,
    );

    if (!userContactPage) {
      throw new AppError('Contact page not found!');
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
