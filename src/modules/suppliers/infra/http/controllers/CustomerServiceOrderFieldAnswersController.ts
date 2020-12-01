import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCustomerServiceOrderFieldAnswerService from '@modules/suppliers/services/CreateCustomerServiceOrderFieldAnswerService';
import ListCustomerServiceOrderFieldAnswersService from '@modules/suppliers/services/ListCustomerServiceOrderFieldAnswersService';
import DeleteCustomerServiceOrderFieldAnswerService from '@modules/suppliers/services/DeleteCustomerServiceOrderFieldAnswerService';
import UpdateCustomerServiceOrderFieldAnswerService from '@modules/suppliers/services/UpdateCustomerServiceOrderFieldAnswerService';

export default class CustomerServiceOrderFieldAnswersController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      company_default_service_order_field_id,
      customer_service_order_id,
      answer,
    } = req.body;

    const createCustomerServiceOrderFieldAnswers = container.resolve(
      CreateCustomerServiceOrderFieldAnswerService,
    );

    const customerServiceOrder = await createCustomerServiceOrderFieldAnswers.execute(
      {
        company_default_service_order_field_id,
        customer_service_order_id,
        answer,
      },
    );

    return res.json(classToClass(customerServiceOrder));
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { customer_service_order_id } = reqParams;
    const listCustomerServiceOrderFieldAnswers = container.resolve(
      ListCustomerServiceOrderFieldAnswersService,
    );

    const customerServiceOrders = await listCustomerServiceOrderFieldAnswers.execute(
      customer_service_order_id,
    );

    return res.json(classToClass(customerServiceOrders));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;
    const { answer } = req.body;
    const updateCustomerServiceOrderFieldAnswer = container.resolve(
      UpdateCustomerServiceOrderFieldAnswerService,
    );

    const customerServiceOrder = await updateCustomerServiceOrderFieldAnswer.execute(
      {
        id,
        answer,
      },
    );

    return res.json(classToClass(customerServiceOrder));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const reqParams = req.params;
    const { id } = reqParams;

    const deleteCustomerServiceOrderFieldAnswers = container.resolve(
      DeleteCustomerServiceOrderFieldAnswerService,
    );

    await deleteCustomerServiceOrderFieldAnswers.execute(id);

    return res.status(200).send();
  }
}
