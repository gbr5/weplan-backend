import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventMemberPaymentsRepository from '../repositories/IEventMemberPaymentsRepository';

@injectable()
class DeleteEventMemberPaymentService {
  constructor(
    @inject('EventMemberPaymentsRepository')
    private eventMemberPaymentsRepository: IEventMemberPaymentsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventMemberPayment = await this.eventMemberPaymentsRepository.findById(
      id,
    );

    if (!eventMemberPayment) {
      throw new AppError('No card check list found.');
    }

    await this.eventMemberPaymentsRepository.delete(eventMemberPayment);
  }
}

export default DeleteEventMemberPaymentService;
