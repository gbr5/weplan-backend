import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventOwnerPaymentsRepository from '../repositories/IEventOwnerPaymentsRepository';

@injectable()
class DeleteEventOwnerPaymentService {
  constructor(
    @inject('EventOwnerPaymentsRepository')
    private eventOwnerPaymentsRepository: IEventOwnerPaymentsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventOwnerPayment = await this.eventOwnerPaymentsRepository.findById(
      id,
    );

    if (!eventOwnerPayment) {
      throw new AppError('No card check list found.');
    }

    await this.eventOwnerPaymentsRepository.delete(eventOwnerPayment);
  }
}

export default DeleteEventOwnerPaymentService;
