import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICustomerServiceOrderFieldAnswersRepository from '@modules/suppliers/repositories/ICustomerServiceOrderFieldAnswersRepository';

@injectable()
class DeleteCustomerServiceOrderFieldAnswerService {
  constructor(
    @inject('CustomerServiceOrderFieldAnswersRepository')
    private customerServiceOrderFieldAnswersRepository: ICustomerServiceOrderFieldAnswersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const customerServiceOrderFieldAnswer = await this.customerServiceOrderFieldAnswersRepository.findById(
      id,
    );

    if (!customerServiceOrderFieldAnswer) {
      throw new AppError('No service order found.');
    }

    await this.customerServiceOrderFieldAnswersRepository.delete(
      customerServiceOrderFieldAnswer,
    );
  }
}

export default DeleteCustomerServiceOrderFieldAnswerService;
