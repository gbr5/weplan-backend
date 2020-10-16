import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ISupplierProductRepository from '@modules/suppliers/repositories/ISupplierProductRepository';

import SupplierProduct from '@modules/suppliers/infra/typeorm/entities/SupplierProduct';

@injectable()
class ShowSupplierProductService {
  constructor(
    @inject('SupplierProductRepository')
    private userSupplierCategoriesRepository: ISupplierProductRepository,
  ) {}

  public async execute(user_id: string): Promise<SupplierProduct[]> {
    const supplierProducts = await this.userSupplierCategoriesRepository.findBySupplierId(
      user_id,
    );

    if (!supplierProducts) {
      throw new AppError('Event not found.');
    }

    return supplierProducts;
  }
}

export default ShowSupplierProductService;
