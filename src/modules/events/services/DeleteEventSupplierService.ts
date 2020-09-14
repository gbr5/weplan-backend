import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IEventSuppliersRepository from '@modules/events/repositories/IEventSuppliersRepository';

@injectable()
class DeleteEventSupplierService {
  constructor(
    @inject('EventSuppliersRepository')
    private selectedSuppliersRepository: IEventSuppliersRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const eventSupplier = await this.selectedSuppliersRepository.findById(id);

    if (!eventSupplier) {
      throw new AppError('Event supplier not found.');
    }

    await this.selectedSuppliersRepository.delete(id);
  }
}

export default DeleteEventSupplierService;
