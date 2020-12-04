import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCardBudgetInstallmentService from '@modules/suppliers/services/CreateCardBudgetInstallmentService';
import ListCardBudgetInstallmentsService from '@modules/suppliers/services/ListCardBudgetInstallmentsService';
import DeleteCardBudgetInstallmentService from '@modules/suppliers/services/DeleteCardBudgetInstallmentService';
import UpdateCardBudgetInstallmentService from '@modules/suppliers/services/UpdateCardBudgetInstallmentService';

export default class CardBudgetInstallmentsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { card_budget_id, value, due_date } = req.body;

    const createCardBudgetInstallments = container.resolve(
      CreateCardBudgetInstallmentService,
    );

    const card = await createCardBudgetInstallments.execute({
      card_budget_id,
      value,
      due_date,
    });

    return res.json(classToClass(card));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { card_budget_id } = dataParams;

    const listCardBudgetInstallments = container.resolve(
      ListCardBudgetInstallmentsService,
    );

    const cards = await listCardBudgetInstallments.execute(card_budget_id);

    return res.json(classToClass(cards));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;
    const { value, due_date } = req.body;

    const cardBudgetInstallment = container.resolve(
      UpdateCardBudgetInstallmentService,
    );

    const updatedCardBudgetInstallment = await cardBudgetInstallment.execute({
      id,
      value,
      due_date,
    });

    return res.json(classToClass(updatedCardBudgetInstallment));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;

    const deleteCardBudgetInstallment = container.resolve(
      DeleteCardBudgetInstallmentService,
    );

    await deleteCardBudgetInstallment.execute(id);

    return res.status(200).send();
  }
}
