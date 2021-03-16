import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateContactPageLinkService from '@modules/contactPages/services/CreateContactPageLinkService';
import UpdateContactPageLinkService from '@modules/contactPages/services/UpdateContactPageLinkService';
import DeleteContactPageLinkService from '@modules/contactPages/services/DeleteContactPageLinkService';

export default class ContactPageLinksController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const {
      contact_page_id,
      label,
      url,
      text_color,
      background_color,
      position,
      isActive,
    } = req.body;

    const createContactPageLinks = container.resolve(
      CreateContactPageLinkService,
    );

    const link = await createContactPageLinks.execute({
      user_id,
      contact_page_id,
      label,
      url,
      text_color,
      background_color,
      position,
      isActive,
    });

    return res.json(link);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const dataParams = req.params;
    const { id } = dataParams;
    const {
      label,
      url,
      text_color,
      background_color,
      position,
      isActive,
    } = req.body;

    const updateContactPageLinks = container.resolve(
      UpdateContactPageLinkService,
    );

    const link = await updateContactPageLinks.execute({
      id,
      user_id,
      label,
      url,
      text_color,
      background_color,
      position,
      isActive,
    });

    return res.json(link);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const dataParams = req.params;
    const { id } = dataParams;
    const deleteContactPageLinks = container.resolve(
      DeleteContactPageLinkService,
    );

    await deleteContactPageLinks.execute(id, user_id);

    return res.status(200).send();
  }
}
