import { injectable, inject } from 'tsyringe';

import CompanyFunnelCardInfoField from '@modules/suppliers/infra/typeorm/entities/CompanyFunnelCardInfoField';
import ICompanyFunnelCardInfoFieldsRepository from '@modules/suppliers/repositories/ICompanyFunnelCardInfoFieldsRepository';
import ICreateCompanyFunnelCardInfoFieldDTO from '@modules/suppliers/dtos/ICreateCompanyFunnelCardInfoFieldDTO';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class CreateCompanyFunnelCardInfoFieldService {
  constructor(
    @inject('CompanyFunnelCardInfoFieldsRepository')
    private funnelCardInfoFieldsRepository: ICompanyFunnelCardInfoFieldsRepository,

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    company_id,
    funnel_id,
    name,
    field_type,
    isRequired,
  }: ICreateCompanyFunnelCardInfoFieldDTO): Promise<
    CompanyFunnelCardInfoField
  > {
    const funnelCardInfoFieldExists = await this.funnelCardInfoFieldsRepository.findByFunnelIdAndName(
      funnel_id,
      name,
    );

    if (funnelCardInfoFieldExists) {
      throw new AppError('There is already a field with this name.');
    }

    const funnelCardInfoField = await this.funnelCardInfoFieldsRepository.create(
      {
        company_id,
        funnel_id,
        name,
        field_type,
        isRequired,
      },
    );

    return funnelCardInfoField;
  }
}

export default CreateCompanyFunnelCardInfoFieldService;
