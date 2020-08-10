import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventTypeSuppliersRepository from '@modules/events/repositories/IEventTypeSuppliersRepository';

interface IRequest {
  user_id: string;
  event_type: string;
}
@injectable()
class UpdateEventTypeSupplierService {
  constructor(
    @inject('EventTypeSuppliersRepository')
    private eventTypeSuppliersRepository: IEventTypeSuppliersRepository,
  ) {}

  public async execute({ user_id, event_type }: IRequest): Promise<void> {
    const eventTypeSupplier = await this.eventTypeSuppliersRepository.findByIdAndEventType(
      user_id,
      event_type,
    );

    if (!eventTypeSupplier) {
      throw new AppError('No supplier found, within this event type.');
    }

    await this.eventTypeSuppliersRepository.delete(eventTypeSupplier);
  }
}

export default UpdateEventTypeSupplierService;
