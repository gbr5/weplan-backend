import { injectable, inject } from 'tsyringe';

import WeplanContractOrder from '@modules/weplan/infra/typeorm/entities/WeplanContractOrder';
import IWeplanContractOrdersRepository from '@modules/weplan/repositories/IWeplanContractOrdersRepository';
import IWeplanProductsRepository from '@modules/weplan/repositories/IWeplanProductsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IUserManagementModulesRepository from '@modules/users/repositories/IUserManagementModulesRepository';
import IFunnelsRepository from '@modules/suppliers/repositories/IFunnelsRepository';

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

    @inject('UserManagementModulesRepository')
    private userManagementModulesRepository: IUserManagementModulesRepository,

    @inject('FunnelsRepository')
    private funnelsRepository: IFunnelsRepository,

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
    const funnels = await this.funnelsRepository.findBySupplierId(customer.id);
    const comercialFunnel = funnels.find(funnel => funnel.name === 'Comercial');
    const operationsFunnel = funnels.find(
      funnel => funnel.name === 'Operations',
    );
    const projectsFunnel = funnels.find(funnel => funnel.name === 'Projects');
    const financialFunnel = funnels.find(funnel => funnel.name === 'Financial');

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

      if (productItem.name === 'Comercial' && comercialFunnel === undefined) {
        this.userManagementModulesRepository.create({
          user_id: customer.id,
          access_level: 1,
          management_module: 'Comercial',
        });
        this.funnelsRepository.create({
          funnel_type: 'Comercial',
          name: 'Comercial',
          supplier_id: customer.id,
        });
      }

      if (productItem.name === 'Operations' && operationsFunnel === undefined) {
        this.userManagementModulesRepository.create({
          user_id: customer.id,
          access_level: 1,
          management_module: 'Operations',
        });
        this.funnelsRepository.create({
          funnel_type: 'Operations',
          name: 'Operations',
          supplier_id: customer.id,
        });
      }

      if (productItem.name === 'Projects' && projectsFunnel === undefined) {
        this.userManagementModulesRepository.create({
          user_id: customer.id,
          access_level: 1,
          management_module: 'Projects',
        });
        this.funnelsRepository.create({
          funnel_type: 'Projects',
          name: 'Projects',
          supplier_id: customer.id,
        });
      }

      if (productItem.name === 'Financial' && financialFunnel === undefined) {
        this.userManagementModulesRepository.create({
          user_id: customer.id,
          access_level: 1,
          management_module: 'Financial',
        });
        this.funnelsRepository.create({
          funnel_type: 'Financial',
          name: 'Financial',
          supplier_id: customer.id,
        });
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

    return contractOrder;
  }
}

export default CreateWeplanContractOrdersService;
