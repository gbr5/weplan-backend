import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

import ICompanyInfoRepository from '../repositories/ICompanyInfoRepository';
import CompanyInfo from '../infra/typeorm/entities/CompanyInfo';

interface IRequest {
  user_id: string;
  logoFilename: string;
}

@injectable()
class UpdateCompanyLogoService {
  constructor(
    @inject('CompanyInfoRepository')
    private companyInfoRepository: ICompanyInfoRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    user_id,
    logoFilename,
  }: IRequest): Promise<CompanyInfo> {
    const user = await this.companyInfoRepository.findByUserId(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change logo.', 401);
    }

    if (user.logo) {
      await this.storageProvider.deleteFile(user.logo);
    }

    const fileName = await this.storageProvider.saveFile(logoFilename);

    user.logo = fileName;

    await this.companyInfoRepository.save(user);

    return user;
  }
}

export default UpdateCompanyLogoService;
