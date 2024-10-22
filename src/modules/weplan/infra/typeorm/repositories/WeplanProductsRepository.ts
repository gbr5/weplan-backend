import { getRepository, Repository } from 'typeorm';

import IWeplanProductsRepository from '@modules/weplan/repositories/IWeplanProductsRepository';
import ICreateWeplanProductDTO from '@modules/weplan/dtos/ICreateWeplanProductDTO';

import WeplanProduct from '@modules/weplan/infra/typeorm/entities/WeplanProduct';
import AppError from '@shared/errors/AppError';

interface IFindProducts {
  id: string;
}

class WeplanProductsRepository implements IWeplanProductsRepository {
  private ormRepository: Repository<WeplanProduct>;

  constructor() {
    this.ormRepository = getRepository(WeplanProduct);
  }

  public async findById(id: string): Promise<WeplanProduct | undefined> {
    const findWeplanProduct = await this.ormRepository.findOne(id);

    return findWeplanProduct;
  }

  public async findByAllById(
    products: IFindProducts[],
  ): Promise<WeplanProduct[]> {
    const findWeplanProducts = await this.ormRepository.findByIds(products);

    if (findWeplanProducts.length !== products.length) {
      throw new AppError('Missing Product');
    }

    return findWeplanProducts;
  }

  public async findByName(name: string): Promise<WeplanProduct | undefined> {
    const findWeplanProduct = await this.ormRepository.findOne({
      where: { name },
    });

    return findWeplanProduct;
  }

  public async findAll(): Promise<WeplanProduct[]> {
    const findWeplanProducts = await this.ormRepository.find();

    return findWeplanProducts;
  }

  public async create(data: ICreateWeplanProductDTO): Promise<WeplanProduct> {
    const funnelType = this.ormRepository.create(data);

    await this.ormRepository.save(funnelType);

    return funnelType;
  }

  public async save(
    weplanManagementModule: WeplanProduct,
  ): Promise<WeplanProduct> {
    return this.ormRepository.save(weplanManagementModule);
  }

  public async delete(id: string): Promise<void> {
    const module = await this.findById(id);
    if (!module) {
      throw new AppError('Management module not found.');
    }
    await this.ormRepository.delete(module.id);
  }
}

export default WeplanProductsRepository;
