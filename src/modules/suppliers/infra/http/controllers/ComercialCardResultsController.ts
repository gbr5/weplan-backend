import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateComercialCardResultsService from '@modules/suppliers/services/CreateComercialCardResultsService';
import ShowComercialCardResultsService from '@modules/suppliers/services/ShowComercialCardResultsService';
import UpdateComercialCardResultsService from '@modules/suppliers/services/UpdateComercialCardResultsService';
import DeleteComercialCardResultService from '@modules/suppliers/services/DeleteComercialCardResultService';

export default class ComercialCardResultssController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { card_id, note, contract_value, isSuccessful } = req.body;

    const createComercialCardResultss = container.resolve(
      CreateComercialCardResultsService,
    );

    const card = await createComercialCardResultss.execute({
      card_id,
      note,
      contract_value,
      isSuccessful,
    });

    return res.json(classToClass(card));
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { card_id } = dataParams;

    const showComercialCardResults = container.resolve(
      ShowComercialCardResultsService,
    );

    const salesPersonBudgets = await showComercialCardResults.execute(card_id);

    return res.json(classToClass(salesPersonBudgets));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;
    const { note, contract_value, isSuccessful } = req.body;

    const comercialCardResults = container.resolve(
      UpdateComercialCardResultsService,
    );

    const updatedComercialCardResults = await comercialCardResults.execute({
      id,
      note,
      contract_value,
      isSuccessful,
    });

    return res.json(classToClass(updatedComercialCardResults));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;
    const comercialCardResults = container.resolve(
      DeleteComercialCardResultService,
    );

    await comercialCardResults.execute(id);

    return res.status(200).send();
  }
}
