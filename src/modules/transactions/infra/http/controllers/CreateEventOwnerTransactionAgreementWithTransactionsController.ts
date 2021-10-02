import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventOwnerTransactionAgreementWithTransactionsService from '@modules/transactions/services/CreateEventOwnerTransactionAgreementWithTransactionsService';

export default class CreateEventOwnerTransactionAgreementWithTransactionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { amount, number_of_installments, owner_id, transactions } = req.body;

    const createEventOwnerTransactionAgreementWithTransactionsService = container.resolve(
      CreateEventOwnerTransactionAgreementWithTransactionsService,
    );

    const ownerTransactionAgreement = await createEventOwnerTransactionAgreementWithTransactionsService.execute(
      {
        amount,
        number_of_installments,
        owner_id,
        transactions,
      },
    );

    return res.json(classToClass(ownerTransactionAgreement));
  }
}
