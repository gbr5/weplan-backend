import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyInfoRepository from '@modules/users/repositories/ICompanyInfoRepository';

import CompanyInfo from '@modules/users/infra/typeorm/entities/CompanyInfo';

interface IRequest {
  user_id: string;
}
@injectable()
class ShowCompanyInfoService {
  constructor(
    @inject('CompanyInfoRepository')
    private companyInfoRepository: ICompanyInfoRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<CompanyInfo> {
    const companyInfo = await this.companyInfoRepository.findByUserId(user_id);

    if (!companyInfo) {
      throw new AppError('Company information not found.');
    }

    return companyInfo;
  }
}

export default ShowCompanyInfoService;
