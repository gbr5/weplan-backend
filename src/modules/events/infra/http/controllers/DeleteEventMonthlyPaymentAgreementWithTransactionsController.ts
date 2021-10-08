import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteEventMonthlyPaymentAgreementWithTransactionsService from '@modules/events/services/DeleteEventMonthlyPaymentAgreementWithTransactionsService';

export default class DeleteEventMonthlyPaymentAgreementWithTransactionsController {
  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const listEventMonthlyPaymentAgreementsService = container.resolve(
      DeleteEventMonthlyPaymentAgreementWithTransactionsService,
    );

    await listEventMonthlyPaymentAgreementsService.execute(id);

    return res
      .status(200)
      .send(
        'Successfully deleted Monthly Payment and its associated agreements and transactions',
      );
  }
}
