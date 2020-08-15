import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import SelectedSupplier from '@modules/events/infra/typeorm/entities/SelectedSupplier';
import ISelectedSuppliersRepository from '@modules/events/repositories/ISelectedSuppliersRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

interface IRequest {
  supplier_id: string;
  event_name: string;
  supplier_sub_category: string;
  isHired: boolean;
}

@injectable()
class CreateSelectedSupplierService {
  constructor(
    @inject('SelectedSuppliersRepository')
    private eventSuppliersRepository: ISelectedSuppliersRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    supplier_id,
    event_name,
    supplier_sub_category,
    isHired,
  }: IRequest): Promise<SelectedSupplier> {
    const eventSupplierExists = await this.eventSuppliersRepository.findByIdAndEvent(
      supplier_id,
      event_name,
    );

    if (eventSupplierExists) {
      throw new AppError(
        'The supplier that you have chosen, is already selected.',
      );
    }

    const event = await this.eventSuppliersRepository.create({
      supplier_id,
      event_name,
      supplier_sub_category,
      isHired,
    });

    await this.notificationsRepository.create({
      recipient_id: supplier_id,
      content: `${supplier_id} adicionado ao ${event_name}.`,
    });

    return event;
  }
}

export default CreateSelectedSupplierService;
