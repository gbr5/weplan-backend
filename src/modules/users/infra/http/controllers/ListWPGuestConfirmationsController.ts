import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListWPGuestConfirmationsService from '@modules/users/services/ListWPGuestConfirmationsService';

export default class ListWPGuestConfirmationsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { wp_guest_id } = reqParams;
    const listReceiverConfirmations = container.resolve(
      ListWPGuestConfirmationsService,
    );

    const wpGuestConfirmations = await listReceiverConfirmations.execute(
      wp_guest_id,
    );

    return res.json(classToClass(wpGuestConfirmations));
  }
}
