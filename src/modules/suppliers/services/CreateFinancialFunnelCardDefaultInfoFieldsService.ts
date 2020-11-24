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
class CreateFinancialFunnelCardDefaultInfoFieldsService {
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

    const firstFinancialInfoFieldExists = await this.companyFunnelCardInfoFieldsRepository.findByFunnelIdAndName(
      funnel_id,
      'Cliente',
    );

    const secondFinancialInfoFieldExists = await this.companyFunnelCardInfoFieldsRepository.findByFunnelIdAndName(
      funnel_id,
      'Tipo de Evento',
    );

    const thirdFinancialInfoFieldExists = await this.companyFunnelCardInfoFieldsRepository.findByFunnelIdAndName(
      funnel_id,
      'Data do Evento',
    );

    const fourthFinancialInfoFieldExists = await this.companyFunnelCardInfoFieldsRepository.findByFunnelIdAndName(
      funnel_id,
      'Valor Esperado',
    );

    const fifthFinancialInfoFieldExists = await this.companyFunnelCardInfoFieldsRepository.findByFunnelIdAndName(
      funnel_id,
      'Probabilidade',
    );

    if (
      firstFinancialInfoFieldExists ||
      secondFinancialInfoFieldExists ||
      thirdFinancialInfoFieldExists ||
      fourthFinancialInfoFieldExists ||
      fifthFinancialInfoFieldExists
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

export default CreateFinancialFunnelCardDefaultInfoFieldsService;
