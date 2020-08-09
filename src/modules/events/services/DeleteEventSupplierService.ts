import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventSuppliersRepository from '@modules/events/repositories/IEventSuppliersRepository';

interface IRequest {
  supplier_id: string;
  event_name: string;
}
@injectable()
class UpdateEventSupplierService {
  constructor(
    @inject('EventSuppliersRepository')
    private eventSuppliersRepository: IEventSuppliersRepository,
  ) {}

  public async execute({ supplier_id, event_name }: IRequest): Promise<void> {
    const eventSupplier = await this.eventSuppliersRepository.findByIdAndEvent({
      supplier_id,
      event_name,
    });

    if (!eventSupplier) {
      throw new AppError('Event supplier not found.');
    }

    await this.eventSuppliersRepository.delete(eventSupplier);
  }
}

export default UpdateEventSupplierService;
