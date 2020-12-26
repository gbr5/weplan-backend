import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateWePlanGuestMessageService from '@modules/users/services/CreateWePlanGuestMessageService';
import ListWePlanGuestMessageService from '@modules/users/services/ListWePlanGuestMessagesService';

export default class WePlanGuestMessagesController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { sender_id, receiver_id, title, message, files } = req.body;

    const createWePlanGuestMessageService = container.resolve(
      CreateWePlanGuestMessageService,
    );

    const wePlanGuestMessage = await createWePlanGuestMessageService.execute({
      sender_id,
      receiver_id,
      title,
      message,
      files,
    });

    return res.json(classToClass(wePlanGuestMessage));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { wp_guest_id } = reqParams;

    const listWePlanGuestMessageService = container.resolve(
      ListWePlanGuestMessageService,
    );

    const wePlanGuestMessage = await listWePlanGuestMessageService.execute(
      wp_guest_id,
    );

    return res.json(classToClass(wePlanGuestMessage));
  }
}
