import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCustomerServiceOrderService from '@modules/suppliers/services/CreateCustomerServiceOrderService';
import ListCustomerServiceOrdersService from '@modules/suppliers/services/ListCustomerServiceOrdersService';
import ListCustomersCompanyServiceOrdersService from '@modules/suppliers/services/ListCustomersCompanyServiceOrdersService';
import DeleteCustomerServiceOrderService from '@modules/suppliers/services/DeleteCustomerServiceOrderService';
import UpdateCustomerServiceOrderService from '@modules/suppliers/services/UpdateCustomerServiceOrderService';

export default class CustomerServiceOrdersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { customer_id, company_id, title, message, isResponded } = req.body;

    const createCustomerServiceOrders = container.resolve(
      CreateCustomerServiceOrderService,
    );

    const customerServiceOrder = await createCustomerServiceOrders.execute({
      customer_id,
      company_id,
      title,
      message,
      isResponded,
    });

    return res.json(classToClass(customerServiceOrder));
  }

  public async listCustomerServiceOrder(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const reqParams = req.params;
    const { customer_id } = reqParams;
    const listCustomerServiceOrders = container.resolve(
      ListCustomerServiceOrdersService,
    );

    const customerServiceOrders = await listCustomerServiceOrders.execute(
      customer_id,
    );

    return res.json(classToClass(customerServiceOrders));
  }

  public async listCompanyServiceOrder(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const reqParams = req.params;
    const { company_id } = reqParams;
    const listCustomersCompanyServiceOrders = container.resolve(
      ListCustomersCompanyServiceOrdersService,
    );

    const customerServiceOrders = await listCustomersCompanyServiceOrders.execute(
      company_id,
    );

    return res.json(classToClass(customerServiceOrders));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { isResponded } = req.body;
    const updateCustomerServiceOrder = container.resolve(
      UpdateCustomerServiceOrderService,
    );

    const customerServiceOrder = await updateCustomerServiceOrder.execute({
      id,
      isResponded,
    });

    return res.json(classToClass(customerServiceOrder));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteCustomerServiceOrders = container.resolve(
      DeleteCustomerServiceOrderService,
    );

    await deleteCustomerServiceOrders.execute(id);

    return res.status(200).send();
  }
}
