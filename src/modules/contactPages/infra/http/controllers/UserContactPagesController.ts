import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserContactPageService from '@modules/contactPages/services/CreateUserContactPageService';
import ShowUserContactPageService from '@modules/contactPages/services/ShowUserContactPageService';
import ListUserContactPagesService from '@modules/contactPages/services/ListUserContactPagesService';
import UpdateUserContactPageService from '@modules/contactPages/services/UpdateUserContactPageService';
import DeleteUserContactPageService from '@modules/contactPages/services/DeleteUserContactPageService';

export default class UserContactPagesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { slug, image_url, title, cta_label, cta_url, isActive } = req.body;
    const createUserContactPages = container.resolve(
      CreateUserContactPageService,
    );

    const contactPage = await createUserContactPages.execute({
      user_id,
      slug,
      image_url,
      title,
      cta_label,
      cta_url,
      isActive,
    });

    return res.json(contactPage);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const dataParams = req.params;
    const { id } = dataParams;
    const { slug, image_url, title, cta_label, cta_url, isActive } = req.body;
    const updateUserContactPages = container.resolve(
      UpdateUserContactPageService,
    );

    const contactPage = await updateUserContactPages.execute({
      id,
      user_id,
      slug,
      image_url,
      title,
      cta_label,
      cta_url,
      isActive,
    });

    return res.json(contactPage);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const showUserContactPage = container.resolve(ShowUserContactPageService);

    const contactPage = await showUserContactPage.execute(id);

    return res.json(classToClass(contactPage));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listUserContactPage = container.resolve(ListUserContactPagesService);

    const contactPages = await listUserContactPage.execute(user_id);

    return res.json(classToClass(contactPages));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const dataParams = req.params;
    const { id } = dataParams;
    const showUserContactPages = container.resolve(
      DeleteUserContactPageService,
    );

    await showUserContactPages.execute(id, user_id);

    return res.status(200).send();
  }
}
