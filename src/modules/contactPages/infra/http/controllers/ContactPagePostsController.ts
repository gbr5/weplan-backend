import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateContactPagePostService from '@modules/contactPages/services/CreateContactPagePostService';
// import ListContactPagePostsService from '@modules/contactPages/services/ListContactPagePostsService';
// import DeleteContactPagePostService from '@modules/contactPages/services/DeleteContactPagePostService';

export default class ContactPagePostsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { contact_page_id, image_url, destination_url } = req.body;
    console.log({ contact_page_id, image_url, destination_url });
    const createContactPagePosts = container.resolve(
      CreateContactPagePostService,
    );

    const post = await createContactPagePosts.execute({
      contact_page_id,
      image_url,
      destination_url,
    });

    return res.json(post);
  }

  // public async delete(req: Request, res: Response): Promise<Response> {
  //   const dataParams = req.params;
  //   const { id } = dataParams;
  //   const showContactPagePosts = container.resolve(DeleteContactPagePostService);

  //   await showContactPagePosts.execute(id);

  //   return res.status(200).send();
  // }
}
