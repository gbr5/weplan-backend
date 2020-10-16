import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISupplierProductRepository from '@modules/suppliers/repositories/ISupplierProductRepository';

@injectable()
class DeleteSupplierProduct {
  constructor(
    @inject('SupplierProductRepository')
    private supplierProductRepository: ISupplierProductRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const product = await this.supplierProductRepository.findById(id);

    if (!product) {
      throw new AppError('No supplier found, within this category.');
    }

    await this.supplierProductRepository.delete(product.id);
  }
}

export default DeleteSupplierProduct;
