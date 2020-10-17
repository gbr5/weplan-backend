import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IWeplanProductsRepository from '@modules/weplan/repositories/IWeplanProductsRepository';

import WeplanProduct from '@modules/weplan/infra/typeorm/entities/WeplanProduct';
import ICreateWeplanProductDTO from '../dtos/ICreateWeplanProductDTO';

@injectable()
class UpdateWeplanProductsService {
  constructor(
    @inject('WeplanProductsRepository')
    private weplanManagementModulesRepository: IWeplanProductsRepository,
  ) {}

  public async execute({
    id,
    name,
    target_audience,
    price,
  }: ICreateWeplanProductDTO): Promise<WeplanProduct> {
    if (!id) {
      throw new AppError('Product not found.');
    }
    const product = await this.weplanManagementModulesRepository.findById(id);

    if (!product) {
      throw new AppError('WeplanProducts not found.');
    }
    const productName = await this.weplanManagementModulesRepository.findByName(
      name,
    );
    if (productName) {
      throw new AppError('Module already exists.');
    }

    product.name = name;
    product.target_audience = target_audience;
    product.price = price;

    const updatedWeplanProduct = await this.weplanManagementModulesRepository.save(
      product,
    );

    return updatedWeplanProduct;
  }
}

export default UpdateWeplanProductsService;
