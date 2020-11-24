import { injectable, inject } from 'tsyringe';

import FunnelStage from '@modules/suppliers/infra/typeorm/entities/FunnelStage';
import IFunnelStagesRepository from '@modules/suppliers/repositories/IFunnelStagesRepository';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IFunnelsRepository from '../repositories/IFunnelsRepository';

@injectable()
class CreateDefaultComercialFunnelService {
  constructor(
    @inject('FunnelsRepository')
    private funnelsRepository: IFunnelsRepository,

    @inject('FunnelStagesRepository')
    private funnelStagesRepository: IFunnelStagesRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute(company_id: string): Promise<FunnelStage[]> {
    const companyExists = await this.usersRepository.findById(company_id);

    if (!companyExists) {
      throw new AppError('Company not found');
    }
    if (!companyExists.isCompany) {
      throw new AppError(
        'This user is not a company. This route is reserved for companies.',
      );
    }

    const companyFunnels = await this.funnelsRepository.findBySupplierId(
      company_id,
    );

    const defaultComercialFunnelAlreadyExists = companyFunnels.find(
      xFunnel => xFunnel.name === 'Comercial',
    );

    if (defaultComercialFunnelAlreadyExists) {
      throw new AppError(
        'Default comercial funnel already exists. Is not possible to have two default "Comercial Funnel"',
      );
    }

    const defaultComercialFunnel = await this.funnelsRepository.create({
      name: 'Comercial',
      supplier_id: companyExists.id,
      funnel_type: 'Comercial',
    });

    if (!defaultComercialFunnel) {
      throw new AppError('Funnel was not created, something went wrong.');
    }

    const defaultComercialFunnelStages = Promise.all([
      this.funnelStagesRepository.create({
        name: 'Prospectos',
        funnel_id: defaultComercialFunnel.id,
        funnel_order: 1,
      }),
      this.funnelStagesRepository.create({
        name: '1° Contato',
        funnel_id: defaultComercialFunnel.id,
        funnel_order: 2,
      }),
      this.funnelStagesRepository.create({
        name: 'Orçamento Enviado',
        funnel_id: defaultComercialFunnel.id,
        funnel_order: 3,
      }),
      this.funnelStagesRepository.create({
        name: 'Negociação',
        funnel_id: defaultComercialFunnel.id,
        funnel_order: 4,
      }),
      this.funnelStagesRepository.create({
        name: 'Contrato Enviado',
        funnel_id: defaultComercialFunnel.id,
        funnel_order: 5,
      }),
    ]);

    return defaultComercialFunnelStages;
  }
}

export default CreateDefaultComercialFunnelService;
