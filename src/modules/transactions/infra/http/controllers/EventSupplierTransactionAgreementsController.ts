import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventSupplierTransactionAgreementService from '@modules/transactions/services/CreateEventSupplierTransactionAgreementService';
import DeleteEventSupplierTransactionAgreementService from '@modules/transactions/services/DeleteEventSupplierTransactionAgreementService';
import UpdateEventSupplierTransactionAgreementService from '@modules/transactions/services/UpdateEventSupplierTransactionAgreementService';
import ListEventSupplierTransactionAgreementsService from '@modules/transactions/services/ListEventSupplierTransactionAgreementsService';

export default class EventSupplierTransactionAgreementsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { amount, number_of_installments, supplier_id } = req.body;

    const createEventSupplierTransactionAgreementService = container.resolve(
      CreateEventSupplierTransactionAgreementService,
    );

    const supplierTransactionAgreement = await createEventSupplierTransactionAgreementService.execute(
      {
        amount,
        number_of_installments,
        supplier_id,
      },
    );

    return res.json(classToClass(supplierTransactionAgreement));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id, amount, number_of_installments } = req.body;

    const updateEventSupplierTransactionAgreementService = container.resolve(
      UpdateEventSupplierTransactionAgreementService,
    );

    const supplierTransactionAgreement = await updateEventSupplierTransactionAgreementService.execute(
      {
        id,
        amount,
        number_of_installments,
      },
    );

    return res.json(classToClass(supplierTransactionAgreement));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteEventSupplierTransactionAgreementService = container.resolve(
      DeleteEventSupplierTransactionAgreementService,
    );

    await deleteEventSupplierTransactionAgreementService.execute(id);

    return res.status(200).send();
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { supplier_id } = reqParams;

    const listEventSupplierTransactionAgreementsService = container.resolve(
      ListEventSupplierTransactionAgreementsService,
    );

    const supplierTransactionAgreements = await listEventSupplierTransactionAgreementsService.execute(
      supplier_id,
    );

    return res.json(classToClass(supplierTransactionAgreements));
  }
}
