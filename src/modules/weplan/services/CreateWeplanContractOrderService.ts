import { injectable, inject } from 'tsyringe';

import WeplanContractOrder from '@modules/weplan/infra/typeorm/entities/WeplanContractOrder';
import IWeplanContractOrdersRepository from '@modules/weplan/repositories/IWeplanContractOrdersRepository';
import IWeplanProductsRepository from '@modules/suppliers/repositories/IWeplanProductsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

interface IProductsWPDTO {
  weplan_product_id: string;
  quantity: number;
}

interface ICreateWeplanContractOrderDTO {
  user_id: string;
  products: IProductsWPDTO[];
}

@injectable()
class CreateWeplanContractOrdersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('WeplanContractOrdersRepository')
    private weplanContractOrdersRepository: IWeplanContractOrdersRepository,

    @inject('WeplanProductsRepository')
    private weplanProductsRepository: IWeplanProductsRepository,
  ) {}

  public async execute({
    user_id,
    products,
  }: ICreateWeplanContractOrderDTO): Promise<WeplanContractOrder> {
    const customer = await this.usersRepository.findById(user_id);

    if (!customer) {
      throw new AppError('Customer does not exists.');
    }

    const productsIDs = products.map(product => {
      return { id: product.weplan_product_id };
    });

    const productsItems = await this.weplanProductsRepository.findByAllById(
      productsIDs,
    );

    if (productsItems.length !== products.length) {
      throw new AppError('Product Missing');
    }

    const productsList = productsItems.map(productItem => {
      const productList = products.find(
        productFind => productFind.weplan_product_id === productItem.id,
      );

      if (!productList) {
        throw new AppError(`Product ${productItem.name} not found!`);
      }

      return {
        weplan_product_id: productItem.id,
        price: Number(productItem.price),
        quantity: productList.quantity,
      };
    });
    const contractOrder = await this.weplanContractOrdersRepository.create({
      customer,
      products: productsList,
    });
    console.log('customer:', customer, 'contractOrder:', contractOrder);

    return contractOrder;
  }
}

export default CreateWeplanContractOrdersService;
