import { injectable, inject } from 'tsyringe';

import WeplanContractOrder from '@modules/weplan/infra/typeorm/entities/WeplanContractOrder';
import IWeplanContractOrdersRepository from '@modules/weplan/repositories/IWeplanContractOrdersRepository';
import IWeplanProductsRepository from '@modules/weplan/repositories/IWeplanProductsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import IUserManagementModulesRepository from '@modules/users/repositories/IUserManagementModulesRepository';
import IFunnelsRepository from '@modules/suppliers/repositories/IFunnelsRepository';
import IFunnelStagesRepository from '@modules/suppliers/repositories/IFunnelStagesRepository';
import ICompanyFunnelCardInfoFieldsRepository from '@modules/suppliers/repositories/ICompanyFunnelCardInfoFieldsRepository';

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

    @inject('FunnelStagesRepository')
    private funnelStagesRepository: IFunnelStagesRepository,

    @inject('WeplanProductsRepository')
    private weplanProductsRepository: IWeplanProductsRepository,

    @inject('CompanyFunnelCardInfoFieldsRepository')
    private companyFunnelCardInfoFieldsRepository: ICompanyFunnelCardInfoFieldsRepository,
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
    const productionFunnel = funnels.find(
      funnel => funnel.name === 'Production',
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
        this.funnelsRepository
          .create({
            funnel_type: 'Comercial',
            name: 'Comercial',
            supplier_id: customer.id,
          })
          .then(response => {
            this.funnelStagesRepository.create({
              funnel_id: response.id,
              funnel_order: 1,
              name: 'Prospectos',
            });
            this.funnelStagesRepository.create({
              funnel_id: response.id,
              funnel_order: 2,
              name: '1° Contato',
            });
            this.funnelStagesRepository.create({
              funnel_id: response.id,
              funnel_order: 3,
              name: 'Orçamento Enviado',
            });
            this.funnelStagesRepository.create({
              funnel_id: response.id,
              funnel_order: 4,
              name: 'Negociação',
            });
            this.funnelStagesRepository.create({
              funnel_id: response.id,
              funnel_order: 5,
              name: 'Contrato Enviado',
            });
            // Comercial Funnel Default Card Info Fields
            this.companyFunnelCardInfoFieldsRepository.create({
              company_id: user_id,
              funnel_id: response.id,
              name: 'Cliente',
              field_type: 'string',
              isRequired: false,
            });
            this.companyFunnelCardInfoFieldsRepository.create({
              company_id: user_id,
              funnel_id: response.id,
              name: 'Tipo de Evento',
              field_type: 'string',
              isRequired: false,
            });
            this.companyFunnelCardInfoFieldsRepository.create({
              company_id: user_id,
              funnel_id: response.id,
              name: 'Data do Evento',
              field_type: 'string',
              isRequired: false,
            });
            this.companyFunnelCardInfoFieldsRepository.create({
              company_id: user_id,
              funnel_id: response.id,
              name: 'Valor Esperado',
              field_type: 'number',
              isRequired: false,
            });
            this.companyFunnelCardInfoFieldsRepository.create({
              company_id: user_id,
              funnel_id: response.id,
              name: 'Probabilidade',
              field_type: 'number',
              isRequired: false,
            });
          });
      }

      if (productItem.name === 'Production' && productionFunnel === undefined) {
        this.userManagementModulesRepository.create({
          user_id: customer.id,
          access_level: 1,
          management_module: 'Production',
        });
        this.funnelsRepository
          .create({
            funnel_type: 'Production',
            name: 'Production',
            supplier_id: customer.id,
          })
          .then(response => {
            this.funnelStagesRepository.create({
              funnel_id: response.id,
              funnel_order: 1,
              name: 'Definição de Escopo',
            });
            this.funnelStagesRepository.create({
              funnel_id: response.id,
              funnel_order: 2,
              name: 'Planejamento',
            });
            this.funnelStagesRepository.create({
              funnel_id: response.id,
              funnel_order: 3,
              name: 'Execução',
            });
            this.funnelStagesRepository.create({
              funnel_id: response.id,
              funnel_order: 4,
              name: 'Monitoramento e Controle',
            });
            this.funnelStagesRepository.create({
              funnel_id: response.id,
              funnel_order: 5,
              name: 'Encerramento',
            });
          });
      }

      if (productItem.name === 'Projects' && projectsFunnel === undefined) {
        this.userManagementModulesRepository.create({
          user_id: customer.id,
          access_level: 1,
          management_module: 'Projects',
        });
        this.funnelsRepository
          .create({
            funnel_type: 'Projects',
            name: 'Projects',
            supplier_id: customer.id,
          })
          .then(response => {
            this.funnelStagesRepository.create({
              funnel_id: response.id,
              funnel_order: 1,
              name: 'Definição de Escopo',
            });
            this.funnelStagesRepository.create({
              funnel_id: response.id,
              funnel_order: 2,
              name: 'Planejamento',
            });
            this.funnelStagesRepository.create({
              funnel_id: response.id,
              funnel_order: 3,
              name: 'Execução',
            });
            this.funnelStagesRepository.create({
              funnel_id: response.id,
              funnel_order: 4,
              name: 'Monitoramento e Controle',
            });
            this.funnelStagesRepository.create({
              funnel_id: response.id,
              funnel_order: 5,
              name: 'Encerramento',
            });
          });
      }

      if (productItem.name === 'Financial' && financialFunnel === undefined) {
        this.userManagementModulesRepository.create({
          user_id: customer.id,
          access_level: 1,
          management_module: 'Financial',
        });
        this.funnelsRepository
          .create({
            funnel_type: 'Financial',
            name: 'Financial',
            supplier_id: customer.id,
          })
          .then(response => {
            this.funnelStagesRepository.create({
              funnel_id: response.id,
              funnel_order: 1,
              name: 'Contas Pagas',
            });
            this.funnelStagesRepository.create({
              funnel_id: response.id,
              funnel_order: 2,
              name: 'Contas Vencidas',
            });
            this.funnelStagesRepository.create({
              funnel_id: response.id,
              funnel_order: 3,
              name: 'A pagar - 7 dias',
            });
            this.funnelStagesRepository.create({
              funnel_id: response.id,
              funnel_order: 4,
              name: 'A pagar - 30 dias',
            });
            this.funnelStagesRepository.create({
              funnel_id: response.id,
              funnel_order: 5,
              name: 'Recorrentes',
            });
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
