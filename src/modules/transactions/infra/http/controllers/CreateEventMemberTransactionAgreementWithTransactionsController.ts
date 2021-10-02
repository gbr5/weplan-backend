import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventMemberTransactionAgreementWithTransactionsService from '@modules/transactions/services/CreateEventMemberTransactionAgreementWithTransactionsService';

export default class CreateEventMemberTransactionAgreementWithTransactionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      amount,
      number_of_installments,
      member_id,
      transactions,
    } = req.body;

    const createEventMemberTransactionAgreementWithTransactionsService = container.resolve(
      CreateEventMemberTransactionAgreementWithTransactionsService,
    );

    const memberTransactionAgreement = await createEventMemberTransactionAgreementWithTransactionsService.execute(
      {
        amount,
        number_of_installments,
        member_id,
        transactions,
      },
    );

    return res.json(classToClass(memberTransactionAgreement));
  }
}
