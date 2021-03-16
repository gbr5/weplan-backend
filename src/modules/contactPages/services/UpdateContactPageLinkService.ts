import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IContactPageLinksRepository from '../repositories/IContactPageLinksRepository';
import ContactPageLink from '../infra/typeorm/entities/ContactPageLink';
import IUserContactPagesRepository from '../repositories/IUserContactPagesRepository';

interface IRequest {
  id: string;
  user_id: string;
  label: string;
  url: string;
  text_color: string;
  background_color: string;
  position: number;
  isActive: boolean;
}

@injectable()
class UpdateContactPageLinkService {
  constructor(
    @inject('ContactPageLinksRepository')
    private contactPageLinksRepository: IContactPageLinksRepository,

    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,
  ) {}

  public async execute({
    id,
    user_id,
    label,
    url,
    text_color,
    background_color,
    position,
    isActive,
  }: IRequest): Promise<ContactPageLink> {
    const link = await this.contactPageLinksRepository.findById(id);

    if (!link) {
      throw new AppError('Contact page link not found!');
    }

    const contactPage = await this.userContactPagesRepository.findById(
      link.contact_page_id,
    );

    if (!contactPage || contactPage.user_id !== user_id) {
      throw new AppError('Contact page not found!');
    }

    link.label = label;
    link.url = url;
    link.text_color = text_color;
    link.background_color = background_color;
    link.position = position;
    link.isActive = isActive;

    await this.contactPageLinksRepository.save(link);

    return link;
  }
}

export default UpdateContactPageLinkService;
