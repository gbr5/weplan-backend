import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyFunnelCardInfosRepository from '@modules/suppliers/repositories/ICompanyFunnelCardInfosRepository';

@injectable()
class DeleteCompanyFunnelCardInfoService {
  constructor(
    @inject('CompanyFunnelCardInfosRepository')
    private funnelCardInfosRepository: ICompanyFunnelCardInfosRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const funnelCardInfo = await this.funnelCardInfosRepository.findById(id);

    if (!funnelCardInfo) {
      throw new AppError('Selected funnel stage not found.');
    }

    await this.funnelCardInfosRepository.delete(funnelCardInfo);
  }
}

export default DeleteCompanyFunnelCardInfoService;
