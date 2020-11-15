import { injectable, inject } from 'tsyringe';

import CompanyFunnelCardInfo from '@modules/suppliers/infra/typeorm/entities/CompanyFunnelCardInfo';
import ICompanyFunnelCardInfosRepository from '@modules/suppliers/repositories/ICompanyFunnelCardInfosRepository';
import ICreateCompanyFunnelCardInfoDTO from '@modules/suppliers/dtos/ICreateCompanyFunnelCardInfoDTO';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import IStageCardsRepository from '../repositories/IStageCardsRepository';
import ICompanyFunnelCardInfoFieldsRepository from '../repositories/ICompanyFunnelCardInfoFieldsRepository';

@injectable()
class CreateCompanyFunnelCardInfoService {
  constructor(
    @inject('CompanyFunnelCardInfosRepository')
    private funnelCardInfosRepository: ICompanyFunnelCardInfosRepository,

    @inject('StageCardsRepository')
    private cardsRepository: IStageCardsRepository,

    @inject('CompanyFunnelCardInfoFieldsRepository')
    private funnelcardInfoFieldsRepository: ICompanyFunnelCardInfoFieldsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    funnel_card_field_id,
    card_unique_name,
    user_id,
    response,
  }: ICreateCompanyFunnelCardInfoDTO): Promise<CompanyFunnelCardInfo> {
    const cardExists = await this.cardsRepository.findByUniqueName(
      card_unique_name,
    );

    if (!cardExists) {
      throw new AppError('Card not found.');
    }

    const funnelCardInfoFieldExists = await this.funnelcardInfoFieldsRepository.findById(
      funnel_card_field_id,
    );

    if (!funnelCardInfoFieldExists) {
      throw new AppError('Funnel Info Field not found.');
    }

    const funnelCardInfoExists = await this.funnelCardInfosRepository.findByCardUniqueNameAndFunnelId(
      card_unique_name,
      funnel_card_field_id,
    );

    if (funnelCardInfoExists) {
      throw new AppError('Funnel Card Info already exists.');
    }

    const funnelCardInfo = await this.funnelCardInfosRepository.create({
      funnel_card_field_id,
      card_unique_name,
      user_id,
      response,
    });

    return funnelCardInfo;
  }
}

export default CreateCompanyFunnelCardInfoService;
