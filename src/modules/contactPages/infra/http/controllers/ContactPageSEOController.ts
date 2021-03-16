import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateContactPageSEOService from '@modules/contactPages/services/CreateContactPageSEOService';
import UpdateContactPageSEOService from '@modules/contactPages/services/UpdateContactPageSEOService';
import DeleteContactPageSEOService from '@modules/contactPages/services/DeleteContactPageSEOService';

export default class ContactPageSEOController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const {
      contact_page_id,
      image_url,
      title,
      description,
      shouldIndexPage,
    } = req.body;

    const createContactPageSEO = container.resolve(CreateContactPageSEOService);

    const post = await createContactPageSEO.execute({
      user_id,
      contact_page_id,
      image_url,
      description,
      title,
      shouldIndexPage,
    });

    return res.json(post);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const dataParams = req.params;
    const { id } = dataParams;
    const { image_url, description, title, shouldIndexPage } = req.body;

    const updateContactPageSEO = container.resolve(UpdateContactPageSEOService);

    const post = await updateContactPageSEO.execute({
      id,
      user_id,
      image_url,
      description,
      title,
      shouldIndexPage,
    });

    return res.json(post);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const dataParams = req.params;
    const { id } = dataParams;
    const deleteContactPageSEO = container.resolve(DeleteContactPageSEOService);

    await deleteContactPageSEO.execute(id, user_id);

    return res.status(200).send();
  }
}
