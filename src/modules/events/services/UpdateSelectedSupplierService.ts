import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISelectedSuppliersRepository from '@modules/events/repositories/ISelectedSuppliersRepository';

import SelectedSupplier from '@modules/events/infra/typeorm/entities/SelectedSupplier';

interface IRequest {
  supplier_id: string;
  event_id: string;
  supplier_sub_category: string;
  isHired: boolean;
}
@injectable()
class UpdateSelectedService {
  constructor(
    @inject('SelectedSuppliersRepository')
    private selectedSuppliersRepository: ISelectedSuppliersRepository,
  ) {}

  public async execute({
    supplier_id,
    event_id,
    supplier_sub_category,
    isHired,
  }: IRequest): Promise<SelectedSupplier> {
    const selectedSupplier = await this.selectedSuppliersRepository.findByIdAndEvent(
      supplier_id,
      event_id,
    );

    if (!selectedSupplier) {
      throw new AppError('Selected supplier not found.');
    }

    selectedSupplier.supplier_sub_category = supplier_sub_category;
    selectedSupplier.isHired = isHired;

    const updatedSelected = await this.selectedSuppliersRepository.save(
      selectedSupplier,
    );

    return updatedSelected;
  }
}

export default UpdateSelectedService;
