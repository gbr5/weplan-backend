import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCardCustomerServiceOrderService from '@modules/suppliers/services/CreateCardCustomerServiceOrderService';
import ListCardCustomerServiceOrdersService from '@modules/suppliers/services/ListCardCustomerServiceOrdersService';
import DeleteCardCustomerServiceOrderService from '@modules/suppliers/services/DeleteCardCustomerServiceOrderService';
import UpdateCardCustomerServiceOrderService from '@modules/suppliers/services/UpdateCardCustomerServiceOrderService';

export default class CardCustomerServiceOrdersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { customer_service_order_id, card_unique_name } = req.body;

    const createCardCustomerServiceOrders = container.resolve(
      CreateCardCustomerServiceOrderService,
    );

    const card = await createCardCustomerServiceOrders.execute({
      customer_service_order_id,
      card_unique_name,
    });

    return res.json(classToClass(card));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { card_unique_name } = dataParams;

    const listCardCustomerServiceOrders = container.resolve(
      ListCardCustomerServiceOrdersService,
    );

    const cards = await listCardCustomerServiceOrders.execute(card_unique_name);

    return res.json(classToClass(cards));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;
    const { card_unique_name } = req.body;

    const updateCardCustomerServiceOrder = container.resolve(
      UpdateCardCustomerServiceOrderService,
    );

    const cardCustomerServiceOrder = await updateCardCustomerServiceOrder.execute(
      id,
      card_unique_name,
    );

    return res.json(classToClass(cardCustomerServiceOrder));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;

    const deleteCardCustomerServiceOrder = container.resolve(
      DeleteCardCustomerServiceOrderService,
    );

    await deleteCardCustomerServiceOrder.execute(id);

    return res.status(200).send();
  }
}
