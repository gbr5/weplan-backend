import { getRepository, Repository } from 'typeorm';

import IWeplanContractOrderProductsRepository from '@modules/weplan/repositories/IWeplanContractOrderProductsRepository';
import ICreateWeplanContractOrderProductDTO from '@modules/weplan/dtos/ICreateWeplanContractOrderProductDTO';

import WeplanContractOrderProduct from '@modules/weplan/infra/typeorm/entities/WeplanContractOrderProduct';
import AppError from '@shared/errors/AppError';

class WeplanContractOrderProductsRepository
  implements IWeplanContractOrderProductsRepository {
  private ormRepository: Repository<WeplanContractOrderProduct>;

  constructor() {
    this.ormRepository = getRepository(WeplanContractOrderProduct);
  }

  public async findById(
    id: string,
  ): Promise<WeplanContractOrderProduct | undefined> {
    const findWeplanContractOrderProduct = await this.ormRepository.findOne(id);

    return findWeplanContractOrderProduct;
  }

  public async findByContractOrderId(
    contract_order_id: string,
  ): Promise<WeplanContractOrderProduct[]> {
    const findWeplanContractOrderProduct = await this.ormRepository.find({
      where: { contract_order_id },
    });

    return findWeplanContractOrderProduct;
  }

  public async findAll(): Promise<WeplanContractOrderProduct[]> {
    const findWeplanContractOrderProducts = await this.ormRepository.find();

    return findWeplanContractOrderProducts;
  }

  public async create(
    data: ICreateWeplanContractOrderProductDTO,
  ): Promise<WeplanContractOrderProduct> {
    const orderProduct = this.ormRepository.create(data);

    await this.ormRepository.save(orderProduct);

    return orderProduct;
  }

  public async save(
    weplanManagementModule: WeplanContractOrderProduct,
  ): Promise<WeplanContractOrderProduct> {
    return this.ormRepository.save(weplanManagementModule);
  }

  public async delete(id: string): Promise<void> {
    const orderProduct = await this.findById(id);
    if (!orderProduct) {
      throw new AppError('Management orderProduct not found.');
    }
    await this.ormRepository.delete(orderProduct.id);
  }
}

export default WeplanContractOrderProductsRepository;
