import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTransactionAgreementService from '@modules/finances/services/CreateTransactionAgreementService';
import ListTransactionAgreementsService from '@modules/finances/services/ListTransactionAgreementsService';
import DeleteTransactionAgreementService from '@modules/finances/services/DeleteTransactionAgreementService';
import UpdateTransactionAgreementService from '@modules/finances/services/UpdateTransactionAgreementService';

import { classToClass } from 'class-transformer';

export default class TransactionAgreementsController {
  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { supplier_id } = reqParams;

    const listTransactionAgreements = container.resolve(
      ListTransactionAgreementsService,
    );

    const transactionAgreements = await listTransactionAgreements.execute(
      supplier_id,
    );

    return res.json(classToClass(transactionAgreements));
  }

  public async create(req: Request, res: Response): Promise<Response> {
    const {
      supplier_id,
      amount,
      number_of_installments,
      transactions,
    } = req.body;
    console.log('transactionAgreement Controller:', {
      supplier_id,
      amount,
      number_of_installments,
      transactions,
    });

    const createTransactionAgreement = container.resolve(
      CreateTransactionAgreementService,
    );

    const agreement = await createTransactionAgreement.execute({
      supplier_id,
      amount,
      number_of_installments,
      transactions,
    });

    return res.json(classToClass(agreement));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { amount, number_of_installments } = req.body;

    const updateTransactionAgreement = container.resolve(
      UpdateTransactionAgreementService,
    );

    const agreement = await updateTransactionAgreement.execute(
      id,
      amount,
      number_of_installments,
    );

    return res.json(classToClass(agreement));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { id } = dataParams;

    const deleteTransactionAgreementService = container.resolve(
      DeleteTransactionAgreementService,
    );

    const agreement = await deleteTransactionAgreementService.execute(id);

    return res.json(classToClass(agreement));
  }
}
