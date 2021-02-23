import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendMassInvitationService from '@modules/weplan/services/SendMassInvitationService';

export default class SendMassInvitationController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { guests, eventName, eventTrimmedName } = req.body;

    const createWeplanContractOrderProduct = container.resolve(
      SendMassInvitationService,
    );

    await createWeplanContractOrderProduct.execute({
      guests,
      eventName,
      eventTrimmedName,
    });

    return res.status(200).send();
  }
}
