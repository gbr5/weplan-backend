import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyContactInfosRepository from '@modules/suppliers/repositories/ICompanyContactInfosRepository';

import CompanyContactInfo from '@modules/suppliers/infra/typeorm/entities/CompanyContactInfo';

@injectable()
class UpdateCompanyContactInfoDescriptionService {
  constructor(
    @inject('CompanyContactInfosRepository')
    private companyContactInfosRepository: ICompanyContactInfosRepository,
  ) {}

  public async execute(
    id: string,
    info_type: string,
    info: string,
  ): Promise<CompanyContactInfo> {
    const companyContactInfo = await this.companyContactInfosRepository.findById(
      id,
    );

    if (!companyContactInfo) {
      throw new AppError('CompanyContactInfos not found.');
    }

    companyContactInfo.info = info;
    companyContactInfo.info_type = info_type;

    const updatedCompanyContactInfos = await this.companyContactInfosRepository.save(
      companyContactInfo,
    );

    return updatedCompanyContactInfos;
  }
}

export default UpdateCompanyContactInfoDescriptionService;
