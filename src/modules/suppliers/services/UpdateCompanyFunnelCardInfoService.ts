import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyFunnelCardInfosRepository from '@modules/suppliers/repositories/ICompanyFunnelCardInfosRepository';

import CompanyFunnelCardInfo from '@modules/suppliers/infra/typeorm/entities/CompanyFunnelCardInfo';
import ICompanyFunnelCardInfoFieldsRepository from '../repositories/ICompanyFunnelCardInfoFieldsRepository';
import IStageCardsRepository from '../repositories/IStageCardsRepository';

@injectable()
class UpdateCompanyFunnelCardInfoService {
  constructor(
    @inject('CompanyFunnelCardInfosRepository')
    private funnelCardInfosRepository: ICompanyFunnelCardInfosRepository,

    @inject('CompanyFunnelCardInfoFieldsRepository')
    private funnelCardInfoFieldsRepository: ICompanyFunnelCardInfoFieldsRepository,

    @inject('StageCardsRepository')
    private stageCardsRepository: IStageCardsRepository,
  ) {}

  public async execute(
    id: string,
    card_unique_name: string,
    funnel_card_field_id: string,
    response: string,
  ): Promise<CompanyFunnelCardInfo> {
    const funnelCardInfoField = await this.funnelCardInfoFieldsRepository.findById(
      funnel_card_field_id,
    );

    if (!funnelCardInfoField) {
      throw new AppError("Company's funnel card info field not found.");
    }

    const funnelCardInfo = await this.funnelCardInfosRepository.findById(id);

    if (!funnelCardInfo) {
      throw new AppError("Company's funnel card info field not found.");
    }

    const stageCard = await this.stageCardsRepository.findByUniqueName(
      card_unique_name,
    );

    if (!stageCard) {
      throw new AppError("Company's card not found.");
    }

    const funnelCardInfoExists = await this.funnelCardInfosRepository.findByCardUniqueNameAndFunnelId(
      card_unique_name,
      funnelCardInfoField.funnel_id,
    );

    if (funnelCardInfoExists) {
      throw new AppError(
        'There is already a funnel card field with this name.',
      );
    }

    funnelCardInfo.response = response;

    const updatedCompanyFunnelCardInfo = await this.funnelCardInfosRepository.save(
      funnelCardInfo,
    );

    return updatedCompanyFunnelCardInfo;
  }
}

export default UpdateCompanyFunnelCardInfoService;
