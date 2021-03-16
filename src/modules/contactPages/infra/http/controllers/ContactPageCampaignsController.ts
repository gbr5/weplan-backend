import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateContactPageCampaignService from '@modules/contactPages/services/CreateContactPageCampaignService';
import UpdateContactPageCampaignService from '@modules/contactPages/services/UpdateContactPageCampaignService';
import DeleteContactPageCampaignService from '@modules/contactPages/services/DeleteContactPageCampaignService';

export default class ContactPageCampaignsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const {
      contact_page_id,
      name,
      message,
      text_color,
      background_color,
      cta_background_color,
      cta_label,
      url,
      cta_text_color,
    } = req.body;

    const createContactPageCampaigns = container.resolve(
      CreateContactPageCampaignService,
    );

    const campaign = await createContactPageCampaigns.execute({
      user_id,
      contact_page_id,
      name,
      message,
      text_color,
      background_color,
      cta_label,
      cta_text_color,
      cta_background_color,
      url,
      isActive: false,
    });

    return res.json(campaign);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const dataParams = req.params;
    const { id } = dataParams;
    const {
      name,
      message,
      text_color,
      background_color,
      cta_label,
      cta_text_color,
      cta_background_color,
      url,
      isActive,
    } = req.body;

    const updateContactPageCampaigns = container.resolve(
      UpdateContactPageCampaignService,
    );

    const campaign = await updateContactPageCampaigns.execute({
      id,
      user_id,
      name,
      message,
      text_color,
      background_color,
      cta_label,
      cta_text_color,
      cta_background_color,
      url,
      isActive,
    });

    return res.json(campaign);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const dataParams = req.params;
    const { id } = dataParams;
    const deleteContactPageCampaigns = container.resolve(
      DeleteContactPageCampaignService,
    );

    await deleteContactPageCampaigns.execute(id, user_id);

    return res.status(200).send();
  }
}
