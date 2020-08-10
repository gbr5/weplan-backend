import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISelectedSuppliersRepository from '@modules/events/repositories/ISelectedSuppliersRepository';

interface IRequest {
  supplier_id: string;
  event_name: string;
}
@injectable()
class DeleteSelectedSupplierService {
  constructor(
    @inject('SelectedSuppliersRepository')
    private selectedSuppliersRepository: ISelectedSuppliersRepository,
  ) {}

  public async execute({ supplier_id, event_name }: IRequest): Promise<void> {
    const eventSupplier = await this.selectedSuppliersRepository.findByIdAndEvent(
      supplier_id,
      event_name,
    );

    if (!eventSupplier) {
      throw new AppError('Selected supplier not found.');
    }

    await this.selectedSuppliersRepository.delete(eventSupplier);
  }
}

export default DeleteSelectedSupplierService;
