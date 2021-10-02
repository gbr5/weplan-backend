import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateEventMemberTransactionAgreementService from '@modules/transactions/services/CreateEventMemberTransactionAgreementService';
import DeleteEventMemberTransactionAgreementService from '@modules/transactions/services/DeleteEventMemberTransactionAgreementService';
import UpdateEventMemberTransactionAgreementService from '@modules/transactions/services/UpdateEventMemberTransactionAgreementService';
import ListEventMemberTransactionAgreementsService from '@modules/transactions/services/ListEventMemberTransactionAgreementsService';

export default class EventMemberTransactionAgreementsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { amount, number_of_installments, member_id } = req.body;

    const createEventMemberTransactionAgreementService = container.resolve(
      CreateEventMemberTransactionAgreementService,
    );

    const memberTransactionAgreement = await createEventMemberTransactionAgreementService.execute(
      {
        amount,
        number_of_installments,
        member_id,
      },
    );

    return res.json(classToClass(memberTransactionAgreement));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const {
      id,
      amount,
      number_of_installments,
      isCancelled,
      transactions,
    } = req.body;

    const updateEventMemberTransactionAgreementService = container.resolve(
      UpdateEventMemberTransactionAgreementService,
    );

    const memberTransactionAgreement = await updateEventMemberTransactionAgreementService.execute(
      {
        id,
        amount,
        number_of_installments,
        isCancelled,
        transactions,
      },
    );

    return res.json(classToClass(memberTransactionAgreement));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteEventMemberTransactionAgreementService = container.resolve(
      DeleteEventMemberTransactionAgreementService,
    );

    await deleteEventMemberTransactionAgreementService.execute(id);

    return res.status(200).send();
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { member_id } = reqParams;

    const listEventMemberTransactionAgreementsService = container.resolve(
      ListEventMemberTransactionAgreementsService,
    );

    const memberTransactionAgreements = await listEventMemberTransactionAgreementsService.execute(
      member_id,
    );

    return res.json(classToClass(memberTransactionAgreements));
  }
}
