import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IContactPageCampaignsRepository from '../repositories/IContactPageCampaignsRepository';
import ContactPageCampaign from '../infra/typeorm/entities/ContactPageCampaign';
import IUserContactPagesRepository from '../repositories/IUserContactPagesRepository';

interface IRequest {
  id: string;
  user_id: string;
  name: string;
  text_color: string;
  background_color: string;
  message: string;
  cta_label: string;
  cta_text_color: string;
  cta_background_color: string;
  url: string;
  isActive: boolean;
}

@injectable()
class UpdateContactPageCampaignService {
  constructor(
    @inject('ContactPageCampaignsRepository')
    private contactPageCampaignsRepository: IContactPageCampaignsRepository,

    @inject('UserContactPagesRepository')
    private userContactPagesRepository: IUserContactPagesRepository,
  ) {}

  public async execute({
    id,
    user_id,
    name,
    text_color,
    background_color,
    message,
    cta_label,
    cta_text_color,
    cta_background_color,
    url,
    isActive,
  }: IRequest): Promise<ContactPageCampaign> {
    const campaign = await this.contactPageCampaignsRepository.findById(id);

    if (!campaign) {
      throw new AppError('Contact page campaign not found!');
    }

    const contactPage = await this.userContactPagesRepository.findById(
      campaign.contact_page_id,
    );

    if (!contactPage || contactPage.user_id !== user_id) {
      throw new AppError('Contact page not found!');
    }

    campaign.name = name;
    campaign.message = message;
    campaign.text_color = text_color;
    campaign.background_color = background_color;
    campaign.cta_label = cta_label;
    campaign.cta_background_color = cta_background_color;
    campaign.cta_text_color = cta_text_color;
    campaign.url = url;
    campaign.isActive = isActive;

    await this.contactPageCampaignsRepository.save(campaign);

    return campaign;
  }
}

export default UpdateContactPageCampaignService;
