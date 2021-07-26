import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventSuppliersRepository from '@modules/events/repositories/IEventSuppliersRepository';

import EventSupplier from '@modules/events/infra/typeorm/entities/EventSupplier';

interface IRequest {
  name: string;
  supplier_sub_category: string;
  isHired: boolean;
  isDischarged: boolean;
  weplanUser: boolean;
  id: string;
}
@injectable()
class UpdateEventService {
  constructor(
    @inject('EventSuppliersRepository')
    private eventSuppliersRepository: IEventSuppliersRepository,
  ) {}

  public async execute({
    name,
    supplier_sub_category,
    isHired,
    isDischarged,
    weplanUser,
    id,
  }: IRequest): Promise<EventSupplier> {
    const eventSupplier = await this.eventSuppliersRepository.findById(id);

    if (!eventSupplier) {
      throw new AppError('Event supplier not found.');
    }

    eventSupplier.supplier_sub_category = supplier_sub_category;
    eventSupplier.isHired = isHired;
    eventSupplier.isDischarged = isDischarged;
    eventSupplier.weplanUser = weplanUser;
    eventSupplier.name = name;

    const updatedEvent = await this.eventSuppliersRepository.save(
      eventSupplier,
    );

    return updatedEvent;
  }
}

export default UpdateEventService;
