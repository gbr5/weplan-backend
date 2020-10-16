import { getRepository, Repository } from 'typeorm';

import ISupplierProductRepository from '@modules/suppliers/repositories/ISupplierProductRepository';
import ICreateSupplierProductDTO from '@modules/suppliers/dtos/ICreateSupplierProductDTO';

import SupplierProduct from '@modules/suppliers/infra/typeorm/entities/SupplierProduct';
import AppError from '@shared/errors/AppError';

class SupplierProductRepository implements ISupplierProductRepository {
  private ormRepository: Repository<SupplierProduct>;

  constructor() {
    this.ormRepository = getRepository(SupplierProduct);
  }

  public async findBySupplierId(user_id: string): Promise<SupplierProduct[]> {
    const findSupplierProduct = await this.ormRepository.find({
      where: { user_id },
    });

    return findSupplierProduct;
  }

  public async findById(id: string): Promise<SupplierProduct | undefined> {
    const product = await this.ormRepository.findOne(id);

    return product;
  }

  public async findBySupplierAndCategoryAndEventTypeId(
    user_id: string,
    sub_category_id: string,
    event_type_id: string,
  ): Promise<SupplierProduct | undefined> {
    const findSupplierProduct = await this.ormRepository.findOne({
      where: {
        user_id,
        sub_category_id,
        event_type_id,
      },
    });
    return findSupplierProduct;
  }

  public async create({
    user_id,
    sub_category_id,
    event_type_id,
    price,
  }: ICreateSupplierProductDTO): Promise<SupplierProduct> {
    try {
      const supplierProduct = this.ormRepository.create({
        user_id,
        sub_category_id,
        event_type_id,
        price,
      });

      await this.ormRepository.save(supplierProduct);

      return supplierProduct;
    } catch (err) {
      throw new AppError('Algo deu errado, SupplierProductRepository.create');
    }
  }

  public async save(event: SupplierProduct): Promise<SupplierProduct> {
    try {
      return this.ormRepository.save(event);
    } catch (err) {
      throw new AppError('Algo deu errado, SupplierProductRepository.save');
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await this.ormRepository.delete(id);
    } catch (err) {
      throw new AppError('Algo deu errado, SupplierProductRepository.delete');
    }
  }
}

export default SupplierProductRepository;
