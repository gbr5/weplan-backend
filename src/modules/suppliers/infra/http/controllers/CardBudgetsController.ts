import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateCardBudgetService from '@modules/suppliers/services/CreateCardBudgetService';
import ListCardBudgetsService from '@modules/suppliers/services/ListCardBudgetsService';
import ListCustomerBudgetsService from '@modules/suppliers/services/ListCustomerBudgetsService';
import ListCompanyBudgetsService from '@modules/suppliers/services/ListCompanyBudgetsService';
import ListSalesPersonBudgetsService from '@modules/suppliers/services/ListSalesPersonBudgetsService';
import DeleteCardBudgetService from '@modules/suppliers/services/DeleteCardBudgetService';
import UpdateCardBudgetService from '@modules/suppliers/services/UpdateCardBudgetService';

export default class CardBudgetsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      customer_id,
      company_id,
      sales_person_id,
      card_unique_name,
      description,
      value,
      validity_date,
      number_of_installments,
      isValid,
    } = req.body;

    const createCardBudgets = container.resolve(CreateCardBudgetService);

    const card = await createCardBudgets.execute({
      customer_id,
      company_id,
      sales_person_id,
      card_unique_name,
      description,
      value,
      validity_date,
      number_of_installments,
      isValid,
    });

    return res.json(classToClass(card));
  }

  public async listCardBudgets(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;
    const { card_unique_name } = dataParams;

    const listCardBudgets = container.resolve(ListCardBudgetsService);

    const cards = await listCardBudgets.execute(card_unique_name);

    return res.json(classToClass(cards));
  }

  public async listCustomerBudgets(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const dataParams = req.params;
    const { customer_id } = dataParams;

    const listCustomerBudgets = container.resolve(ListCustomerBudgetsService);

    const customerBudgets = await listCustomerBudgets.execute(customer_id);

    return res.json(classToClass(customerBudgets));
  }

  public async listCompanyBudgets(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const dataParams = req.params;
    const { company_id } = dataParams;

    const listCompanyBudgets = container.resolve(ListCompanyBudgetsService);

    const companyBudgets = await listCompanyBudgets.execute(company_id);

    return res.json(classToClass(companyBudgets));
  }

  public async listSalesPersonBudgets(
    req: Request,
    res: Response,
  ): Promise<Response> {
    const dataParams = req.params;
    const { sales_person_id, company_id } = dataParams;

    const listSalesPersonBudgets = container.resolve(
      ListSalesPersonBudgetsService,
    );

    const salesPersonBudgets = await listSalesPersonBudgets.execute(
      sales_person_id,
      company_id,
    );

    return res.json(classToClass(salesPersonBudgets));
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;
    const {
      description,
      value,
      validity_date,
      number_of_installments,
      isValid,
    } = req.body;

    const cardBudget = container.resolve(UpdateCardBudgetService);

    const updatedCardBudget = await cardBudget.execute({
      id,
      description,
      value,
      validity_date,
      number_of_installments,
      isValid,
    });

    return res.json(classToClass(updatedCardBudget));
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const dataParams = req.params;

    const { id } = dataParams;

    const deleteCardBudget = container.resolve(DeleteCardBudgetService);

    await deleteCardBudget.execute(id);

    return res.status(200).send();
  }
}
