import { Request, Response } from 'express';
import { container } from 'tsyringe';

import DeleteEventSupplierTransactionAgreementsBySupplierIdService from '@modules/transactions/services/DeleteEventSupplierTransactionAgreementsBySupplierIdService';

export default class DeleteEventSupplierTransactionAgreementsController {
  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { supplier_id } = reqParams;

    const deleteEventSupplierTransactionAgreementService = container.resolve(
      DeleteEventSupplierTransactionAgreementsBySupplierIdService,
    );

    await deleteEventSupplierTransactionAgreementService.execute(supplier_id);

    return res.status(200).send();
  }
}
