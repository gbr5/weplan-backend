import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventParticipantMonthlyPaymentAgreementsService from '@modules/events/services/CreateEventParticipantMonthlyPaymentAgreementsService';

export default class CreateEventParticipantMonthlyPaymentAgreementsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      event_id,
      amount,
      monthly_payment,
      name,
      number_of_installments,
      participants,
      start_date,
    } = req.body;
    const createEventMemberTask = container.resolve(
      CreateEventParticipantMonthlyPaymentAgreementsService,
    );

    const eventTask = await createEventMemberTask.execute({
      event_id,
      amount,
      monthly_payment,
      name,
      number_of_installments,
      participants,
      start_date,
    });

    return res.json(classToClass(eventTask));
  }
}
