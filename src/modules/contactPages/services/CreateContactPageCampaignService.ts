import { injectable, inject } from 'tsyringe';

import IUserContactPagesRepository from '@modules/contactPages/repositories/IUserContactPagesRepository';
import AppError from '@shared/errors/AppError';
import IContactPageCampaignsRepository from '../repositories/IContactPageCampaignsRepository';
import ContactPageCampaign from '../infra/typeorm/entities/ContactPageCampaign';
import ICreateContactPageCampaignDTO from '../dtos/ICreateContactPageCampaignDTO';

interface IRequest extends ICreateContactPageCampaignDTO {
  user_id: string;
}

@injectable()
class CreateContactPageCampaignService {
  constructor(
    @inject('ContactPageCampaignsRepository')
    private contactPageCampaignsRepository: IContactPageCampaignsRepository,

    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,
  ) {}

  public async execute({
    user_id,
    contact_page_id,
    name,
    message,
    background_color,
    text_color,
    cta_label,
    cta_background_color,
    cta_text_color,
    url,
    isActive,
  }: IRequest): Promise<ContactPageCampaign> {
    const userContactPage = await this.userContactPagesRepository.findById(
      contact_page_id,
    );

    if (!userContactPage) {
      throw new AppError('Contact page not found!');
    }

    if (user_id !== userContactPage.user_id) {
      throw new AppError('User not found!');
    }

    const contactPageCampaign = await this.contactPageCampaignsRepository.create(
      {
        contact_page_id,
        name,
        message,
        background_color,
        text_color,
        cta_label,
        cta_background_color,
        cta_text_color,
        url,
        isActive,
      },
    );

    return contactPageCampaign;
  }
}

export default CreateContactPageCampaignService;
