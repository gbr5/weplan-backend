import { injectable, inject } from 'tsyringe';

import CompanyFunnelCardInfoField from '@modules/suppliers/infra/typeorm/entities/CompanyFunnelCardInfoField';
import ICompanyFunnelCardInfoFieldsRepository from '@modules/suppliers/repositories/ICompanyFunnelCardInfoFieldsRepository';
import IFunnelsRepository from '@modules/suppliers/repositories/IFunnelsRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
  company_id: string;
  funnel_id: string;
}

@injectable()
class CreateComercialFunnelCardDefaultInfoFieldService {
  constructor(
    @inject('CompanyFunnelCardInfoFieldsRepository')
    private companyFunnelCardInfoFieldsRepository: ICompanyFunnelCardInfoFieldsRepository,

    @inject('FunnelsRepository')
    private funnelsRepository: IFunnelsRepository,
  ) {}

  public async execute({
    company_id,
    funnel_id,
  }: IRequest): Promise<CompanyFunnelCardInfoField[]> {
    const funnelExists = await this.funnelsRepository.findById(funnel_id);

    if (!funnelExists) {
      throw new AppError('Funnel not found.');
    }

    const firstComercialInfoFieldExists = await this.companyFunnelCardInfoFieldsRepository.findByFunnelIdAndName(
      funnel_id,
      'Cliente',
    );

    const secondComercialInfoFieldExists = await this.companyFunnelCardInfoFieldsRepository.findByFunnelIdAndName(
      funnel_id,
      'Tipo de Evento',
    );

    const thirdComercialInfoFieldExists = await this.companyFunnelCardInfoFieldsRepository.findByFunnelIdAndName(
      funnel_id,
      'Data do Evento',
    );

    const fourthComercialInfoFieldExists = await this.companyFunnelCardInfoFieldsRepository.findByFunnelIdAndName(
      funnel_id,
      'Valor Esperado',
    );

    const fifthComercialInfoFieldExists = await this.companyFunnelCardInfoFieldsRepository.findByFunnelIdAndName(
      funnel_id,
      'Probabilidade',
    );

    if (
      firstComercialInfoFieldExists ||
      secondComercialInfoFieldExists ||
      thirdComercialInfoFieldExists ||
      fourthComercialInfoFieldExists ||
      fifthComercialInfoFieldExists
    ) {
      throw new AppError('There is already a field with this name.');
    }

    const funnelCardInfoFields = Promise.all([
      this.companyFunnelCardInfoFieldsRepository.create({
        company_id,
        funnel_id,
        name: 'Cliente',
        field_type: 'string',
        isRequired: false,
      }),
      this.companyFunnelCardInfoFieldsRepository.create({
        company_id,
        funnel_id,
        name: 'Tipo de Evento',
        field_type: 'string',
        isRequired: false,
      }),
      this.companyFunnelCardInfoFieldsRepository.create({
        company_id,
        funnel_id,
        name: 'Data do Evento',
        field_type: 'string',
        isRequired: false,
      }),
      this.companyFunnelCardInfoFieldsRepository.create({
        company_id,
        funnel_id,
        name: 'Valor Esperado',
        field_type: 'number',
        isRequired: false,
      }),
      this.companyFunnelCardInfoFieldsRepository.create({
        company_id,
        funnel_id,
        name: 'Probabilidade',
        field_type: 'number',
        isRequired: false,
      }),
    ]);

    return funnelCardInfoFields;
  }
}

export default CreateComercialFunnelCardDefaultInfoFieldService;