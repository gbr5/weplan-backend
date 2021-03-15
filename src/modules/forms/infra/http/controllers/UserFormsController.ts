import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserFormService from '@modules/forms/services/CreateUserFormService';
import ShowUserFormService from '@modules/forms/services/ShowUserFormService';
import UpdateUserFormService from '@modules/forms/services/UpdateUserFormService';
import DeleteUserFormService from '@modules/forms/services/DeleteUserFormService';

export default class UserFormsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const { slug, name, title, message, isActive } = req.body;
    const createUserForms = container.resolve(CreateUserFormService);

    const form = await createUserForms.execute({
      user_id,
      slug,
      name,
      title,
      message,
      isActive,
    });

    return res.json(form);
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;
    const user_id = req.user.id;
    const { slug, name, title, message, isActive } = req.body;
    const updateUserForms = container.resolve(UpdateUserFormService);

    const form = await updateUserForms.execute({
      id,
      user_id,
      slug,
      name,
      title,
      message,
      isActive,
    });

    return res.json(form);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { name, slug } = dataParams;

    const updateUserForm = container.resolve(ShowUserFormService);

    const form = await updateUserForm.execute(slug, name);

    return res.json(classToClass(form));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;
    const dataParams = req.params;
    const { id } = dataParams;
    const deleteUserForms = container.resolve(DeleteUserFormService);

    await deleteUserForms.execute(id, user_id);

    return res.status(200).send();
  }
}
