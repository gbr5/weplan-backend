import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCardCustomerService from '@modules/suppliers/services/CreateCardContactCustomerService';
import ListCardCustomersService from '@modules/suppliers/services/ListCardCustomersService';
import DeleteCardCustomerService from '@modules/suppliers/services/DeleteCardCustomerService';
import UpdateCardCustomerService from '@modules/suppliers/services/UpdateCardCustomerService';

export default class CardCustomersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { customer_id, card_unique_name, description } = req.body;

    const createCardCustomers = container.resolve(CreateCardCustomerService);

    const card = await createCardCustomers.execute({
      customer_id,
      card_unique_name,
      description,
    });

    return res.json(classToClass(card));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { card_unique_name } = dataParams;

    const listCardCustomers = container.resolve(ListCardCustomersService);

    const cards = await listCardCustomers.execute(card_unique_name);

    return res.json(classToClass(cards));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;
    const { description } = req.body;
    console.log(id, description);

    const updateCardCustomer = container.resolve(UpdateCardCustomerService);

    const cardCustomer = await updateCardCustomer.execute(id, description);

    return res.json(classToClass(cardCustomer));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;

    const deleteCardCustomer = container.resolve(DeleteCardCustomerService);

    await deleteCardCustomer.execute(id);

    return res.status(200).send();
  }
}
