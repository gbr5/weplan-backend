import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventTypeSuppliersRepository from '@modules/events/repositories/IEventTypeSuppliersRepository';

import EventTypeSupplier from '@modules/events/infra/typeorm/entities/EventTypeSupplier';

interface IRequest {
  user_id: string;
  event_type: string;
}

@injectable()
class ShowEventTypeSupplierService {
  constructor(
    @inject('EventTypeSuppliersRepository')
    private eventTypeSuppliersRepository: IEventTypeSuppliersRepository,
  ) {}

  public async execute({
    user_id,
    event_type,
  }: IRequest): Promise<EventTypeSupplier> {
    const event = await this.eventTypeSuppliersRepository.findByIdAndEventType(
      user_id,
      event_type,
    );

    if (!event) {
      throw new AppError('Event not found.');
    }

    return event;
  }
}

export default ShowEventTypeSupplierService;
