import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateGuestContactInfosService from '@modules/events/services/CreateGuestContactInfoService';
import UpdateGuestContactInfoService from '@modules/events/services/UpdateGuestContactInfoService';
import ListGuestContactInfosService from '@modules/events/services/ListGuestContactInfosService';
import DeleteGuestContactInfoService from '@modules/events/services/DeleteGuestContactInfoService';

export default class GuestContactInfosController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { contact_info, contact_type_id, guest_id } = req.body;

    const createGuestContactInfos = container.resolve(
      CreateGuestContactInfosService,
    );

    const guestContactInfo = await createGuestContactInfos.execute({
      contact_info,
      contact_type_id,
      guest_id,
    });

    return res.json(classToClass(guestContactInfo));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { guest_id } = dataParams;

    const listGuestContactInfos = container.resolve(
      ListGuestContactInfosService,
    );

    const guestContactInfos = await listGuestContactInfos.execute(guest_id);

    return res.json(classToClass(guestContactInfos));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const { contact_info } = req.body;
    const updateGuestContactInfo = container.resolve(
      UpdateGuestContactInfoService,
    );

    const event = await updateGuestContactInfo.execute({
      id,
      contact_info,
    });

    return res.json(event);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;

    const deleteGuestContactInfo = container.resolve(
      DeleteGuestContactInfoService,
    );

    await deleteGuestContactInfo.execute(id);

    return res.status(200).send();
  }
}
