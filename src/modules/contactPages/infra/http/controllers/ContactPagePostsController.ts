import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateContactPagePostService from '@modules/contactPages/services/CreateContactPagePostService';
import UpdateContactPagePostService from '@modules/contactPages/services/UpdateContactPagePostService';
import DeleteContactPagePostService from '@modules/contactPages/services/DeleteContactPagePostService';

export default class ContactPagePostsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { contact_page_id, image_url, destination_url } = req.body;

    const createContactPagePosts = container.resolve(
      CreateContactPagePostService,
    );

    const post = await createContactPagePosts.execute({
      user_id,
      contact_page_id,
      image_url,
      destination_url,
    });

    return res.json(post);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const dataParams = req.params;
    const { id } = dataParams;
    const { image_url, destination_url } = req.body;

    const updateContactPagePosts = container.resolve(
      UpdateContactPagePostService,
    );

    const post = await updateContactPagePosts.execute({
      id,
      user_id,
      image_url,
      destination_url,
    });

    return res.json(post);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const dataParams = req.params;
    const { id } = dataParams;
    const deleteContactPagePosts = container.resolve(
      DeleteContactPagePostService,
    );

    await deleteContactPagePosts.execute(id, user_id);

    return res.status(200).send();
  }
}
