import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListEventMonthlyPaymentAgreementsService from '@modules/events/services/ListEventMonthlyPaymentAgreementsService';

export default class EventMonthlyPaymentAgreementsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { event_id } = reqParams;

    const listEventMonthlyPaymentAgreementsService = container.resolve(
      ListEventMonthlyPaymentAgreementsService,
    );

    const eventTask = await listEventMonthlyPaymentAgreementsService.execute(
      event_id,
    );

    return res.json(classToClass(eventTask));
  }
}
