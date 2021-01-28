import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateInspirationImageService from '@modules/users/services/CreateInspirationImageService';
import DeleteInspirationImageService from '@modules/users/services/DeleteInspirationImageService';
import ListInspirationImagesService from '@modules/users/services/ListInspirationImagesService';
import UpdateInspirationImageService from '@modules/users/services/UpdateInspirationImageService';

export default class InspirationImagesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { description, image_id } = req.body;
    const user_id = req.user.id;

    const createInspirationImage = container.resolve(
      CreateInspirationImageService,
    );

    const user = await createInspirationImage.execute({
      user_id,
      image_id,
      description,
    });

    return res.json(classToClass(user));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const user_id = req.user.id;

    const listInspirationImage = container.resolve(
      ListInspirationImagesService,
    );

    const images = await listInspirationImage.execute(user_id);

    return res.json(classToClass(images));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { description } = req.body;

    const updateInspirationImage = container.resolve(
      UpdateInspirationImageService,
    );

    const images = await updateInspirationImage.execute({
      id,
      description,
    });

    return res.json(classToClass(images));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteInspirationImage = container.resolve(
      DeleteInspirationImageService,
    );

    const image = await deleteInspirationImage.execute(id);

    return res.json(classToClass(image));
  }
}
