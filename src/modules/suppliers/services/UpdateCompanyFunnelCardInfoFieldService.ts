import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyFunnelCardInfoFieldsRepository from '@modules/suppliers/repositories/ICompanyFunnelCardInfoFieldsRepository';

import CompanyFunnelCardInfoField from '@modules/suppliers/infra/typeorm/entities/CompanyFunnelCardInfoField';

@injectable()
class UpdateCompanyFunnelCardInfoFieldService {
  constructor(
    @inject('CompanyFunnelCardInfoFieldsRepository')
    private funnelCardInfoFieldsRepository: ICompanyFunnelCardInfoFieldsRepository,
  ) {}

  public async execute(
    id: string,
    funnel_id: string,
    name: string,
    field_type: string,
    isRequired: boolean,
  ): Promise<CompanyFunnelCardInfoField> {
    const funnelCardInfoField = await this.funnelCardInfoFieldsRepository.findById(
      id,
    );

    if (!funnelCardInfoField) {
      throw new AppError("Company's funnel card info field not found.");
    }

    const funnelCardInfoFieldExists = await this.funnelCardInfoFieldsRepository.findByFunnelIdAndName(
      funnel_id,
      name,
    );

    if (funnelCardInfoFieldExists) {
      throw new AppError(
        'There is already a funnel card field with this name.',
      );
    }

    funnelCardInfoField.name = name;
    funnelCardInfoField.field_type = field_type;
    funnelCardInfoField.isRequired = isRequired;

    const updatedCompanyFunnelCardInfoField = await this.funnelCardInfoFieldsRepository.save(
      funnelCardInfoField,
    );

    return updatedCompanyFunnelCardInfoField;
  }
}

export default UpdateCompanyFunnelCardInfoFieldService;
