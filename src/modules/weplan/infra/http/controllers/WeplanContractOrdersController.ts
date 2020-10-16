import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateWeplanContractOrderService from '@modules/weplan/services/CreateWeplanContractOrderService';
import DeleteWeplanContractOrderService from '@modules/weplan/services/DeleteWeplanContractOrderService';
import ListWeplanContractOrdersService from '@modules/weplan/services/ListWeplanContractOrdersService';

export default class WeplanContractOrderController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { user_id } = req.body;

    const createWeplanContractOrder = container.resolve(
      CreateWeplanContractOrderService,
    );

    const order = await createWeplanContractOrder.execute({
      user_id,
    });

    return res.json(order);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { user_id } = reqParams;
    const listWeplanContractOrders = container.resolve(
      ListWeplanContractOrdersService,
    );

    const products = await listWeplanContractOrders.execute(user_id);

    return res.json(products);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteWeplanContractOrder = container.resolve(
      DeleteWeplanContractOrderService,
    );

    await deleteWeplanContractOrder.execute(id);

    return res.status(200).send();
  }
}
