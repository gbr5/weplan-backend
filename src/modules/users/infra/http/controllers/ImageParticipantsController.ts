import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateImageParticipantService from '@modules/users/services/CreateImageParticipantService';
import DeleteImageParticipantService from '@modules/users/services/DeleteImageParticipantService';
import ListImageParticipantsService from '@modules/users/services/ListImageParticipantsService';

export default class UsersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { image_id } = reqParams;

    const user_id = req.user.id;

    const createImageParticipant = container.resolve(
      CreateImageParticipantService,
    );

    const user = await createImageParticipant.execute({
      image_id,
      user_id,
    });

    return res.json(classToClass(user));
  }

  public async list(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { image_id } = reqParams;

    const listUsersImage = container.resolve(ListImageParticipantsService);

    const files = await listUsersImage.execute(image_id);

    return res.json(classToClass(files));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteImageParticipant = container.resolve(
      DeleteImageParticipantService,
    );

    await deleteImageParticipant.execute(id);

    return res.status(200).send();
  }
}
