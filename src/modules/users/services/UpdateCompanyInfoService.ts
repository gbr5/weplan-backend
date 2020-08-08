import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyInfoRepository from '@modules/users/repositories/ICompanyInfoRepository';

import CompanyInfo from '@modules/users/infra/typeorm/entities/CompanyInfo';

interface IRequest {
  company_id: string;
  user_id: string;
  name: string;
}
@injectable()
class UpdateCompanyInfoService {
  constructor(
    @inject('CompanyInfoRepository')
    private companyInfoRepository: ICompanyInfoRepository,
  ) {}

  public async execute({
    company_id,
    user_id,
    name,
  }: IRequest): Promise<CompanyInfo> {
    const company_info = await this.companyInfoRepository.findByUserId(user_id);

    if (!company_info) {
      throw new AppError('Company information not found.');
    }

    company_info.company_id = company_id;
    company_info.name = name;

    const updatedCompany_info = await this.companyInfoRepository.save(
      company_info,
    );

    return updatedCompany_info;
  }
}

export default UpdateCompanyInfoService;
