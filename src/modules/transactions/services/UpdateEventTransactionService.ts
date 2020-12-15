import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventTransactionsRepository from '@modules/transactions/repositories/IEventTransactionsRepository';

import EventTransaction from '@modules/transactions/infra/typeorm/entities/EventTransaction';

interface IEventTransactionDTO {
  id: string;
  weplanUser: string;
  weplanUserType: string;
  transaction_type: string;
  description: string;
}

@injectable()
class UpdateEventTransactionService {
  constructor(
    @inject('EventTransactionsRepository')
    private eventTransactionsRepository: IEventTransactionsRepository,
  ) {}

  public async execute({
    id,
    weplanUser,
    weplanUserType,
    transaction_type,
    description,
  }: IEventTransactionDTO): Promise<EventTransaction> {
    const eventTransaction = await this.eventTransactionsRepository.findById(
      id,
    );

    if (!eventTransaction) {
      throw new AppError('EventTransaction not found.');
    }
    eventTransaction.weplanUser = weplanUser;
    eventTransaction.weplanUserType = weplanUserType;
    eventTransaction.transaction_type = transaction_type;
    eventTransaction.description = description;

    const updatedEventTransaction = await this.eventTransactionsRepository.save(
      eventTransaction,
    );

    return updatedEventTransaction;
  }
}

export default UpdateEventTransactionService;
