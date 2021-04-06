import { injectable, inject } from 'tsyringe';

import ICompanyInfoRepository from '@modules/users/repositories/ICompanyInfoRepository';

import CompanyInfo from '@modules/users/infra/typeorm/entities/CompanyInfo';

interface IRequest {
  name: string;
}
@injectable()
class ShowCompanyInfoByNameService {
  constructor(
    @inject('CompanyInfoRepository')
    private companyInfoRepository: ICompanyInfoRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<CompanyInfo | undefined> {
    const companyInfo = await this.companyInfoRepository.findByName(name);

    return companyInfo;
  }
}

export default ShowCompanyInfoByNameService;
