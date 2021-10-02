import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventOwnerTransactionAgreementService from '@modules/transactions/services/CreateEventOwnerTransactionAgreementService';
import DeleteEventOwnerTransactionAgreementService from '@modules/transactions/services/DeleteEventOwnerTransactionAgreementService';
import UpdateEventOwnerTransactionAgreementService from '@modules/transactions/services/UpdateEventOwnerTransactionAgreementService';
import ListEventOwnerTransactionAgreementsService from '@modules/transactions/services/ListEventOwnerTransactionAgreementsService';

export default class EventOwnerTransactionAgreementsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { amount, number_of_installments, owner_id } = req.body;
    console.log({ amount, number_of_installments, owner_id });

    const createEventOwnerTransactionAgreementService = container.resolve(
      CreateEventOwnerTransactionAgreementService,
    );

    const ownerTransactionAgreement = await createEventOwnerTransactionAgreementService.execute(
      {
        amount,
        number_of_installments,
        owner_id,
      },
    );

    console.log({
      amount,
      number_of_installments,
      owner_id,
    });

    return res.json(classToClass(ownerTransactionAgreement));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      id,
      amount,
      number_of_installments,
      isCancelled,
      transactions,
    } = req.body;

    const updateEventOwnerTransactionAgreementService = container.resolve(
      UpdateEventOwnerTransactionAgreementService,
    );

    const ownerTransactionAgreement = await updateEventOwnerTransactionAgreementService.execute(
      {
        id,
        amount,
        number_of_installments,
        isCancelled,
        transactions,
      },
    );

    return res.json(classToClass(ownerTransactionAgreement));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteEventOwnerTransactionAgreementService = container.resolve(
      DeleteEventOwnerTransactionAgreementService,
    );

    await deleteEventOwnerTransactionAgreementService.execute(id);

    return res.status(200).send();
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { owner_id } = reqParams;

    const listEventOwnerTransactionAgreementsService = container.resolve(
      ListEventOwnerTransactionAgreementsService,
    );

    const ownerTransactionAgreements = await listEventOwnerTransactionAgreementsService.execute(
      owner_id,
    );

    return res.json(classToClass(ownerTransactionAgreements));
  }
}
