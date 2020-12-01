import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICustomerServiceOrderFieldAnswersRepository from '@modules/suppliers/repositories/ICustomerServiceOrderFieldAnswersRepository';

import CustomerServiceOrderFieldAnswer from '@modules/suppliers/infra/typeorm/entities/CustomerServiceOrderFieldAnswer';

interface IRequest {
  id: string;
  answer: string;
}

@injectable()
class UpdateCustomerServiceOrderFieldAnswerDescriptionService {
  constructor(
    @inject('CustomerServiceOrderFieldAnswersRepository')
    private customerServiceOrdersRepository: ICustomerServiceOrderFieldAnswersRepository,
  ) {}

  public async execute({
    id,
    answer,
  }: IRequest): Promise<CustomerServiceOrderFieldAnswer> {
    const customerServiceOrder = await this.customerServiceOrdersRepository.findById(
      id,
    );

    if (!customerServiceOrder) {
      throw new AppError('CustomerServiceOrderFieldAnswers not found.');
    }

    customerServiceOrder.answer = answer;

    const updatedCustomerServiceOrderFieldAnswers = await this.customerServiceOrdersRepository.save(
      customerServiceOrder,
    );

    return updatedCustomerServiceOrderFieldAnswers;
  }
}

export default UpdateCustomerServiceOrderFieldAnswerDescriptionService;
