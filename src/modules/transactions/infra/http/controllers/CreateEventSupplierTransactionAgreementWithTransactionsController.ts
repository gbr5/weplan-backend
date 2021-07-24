import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventSupplierTransactionAgreementWithTransactionsService from '@modules/transactions/services/CreateEventSupplierTransactionAgreementWithTransactionsService';

export default class CreateEventSupplierTransactionAgreementWithTransactionsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      amount,
      number_of_installments,
      supplier_id,
      transactions,
    } = req.body;

    const createEventSupplierTransactionAgreementWithTransactionsService = container.resolve(
      CreateEventSupplierTransactionAgreementWithTransactionsService,
    );

    const supplierTransactionAgreement = await createEventSupplierTransactionAgreementWithTransactionsService.execute(
      {
        amount,
        number_of_installments,
        supplier_id,
        transactions,
      },
    );

    return res.json(classToClass(supplierTransactionAgreement));
  }
}
