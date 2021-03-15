import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IContactPageLinksRepository from '../repositories/IContactPageLinksRepository';
import ContactPageLink from '../infra/typeorm/entities/ContactPageLink';

interface IRequest {
  id: string;
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
  ) {}

  public async execute({
    id,
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
