import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompanyFunnelCardInfoFieldsRepository from '@modules/suppliers/repositories/ICompanyFunnelCardInfoFieldsRepository';

@injectable()
class DeleteCompanyFunnelCardInfoFieldService {
  constructor(
    @inject('CompanyFunnelCardInfoFieldsRepository')
    private funnelCardInfoFieldsRepository: ICompanyFunnelCardInfoFieldsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const funnelCardInfoField = await this.funnelCardInfoFieldsRepository.findById(
      id,
    );

    if (!funnelCardInfoField) {
      throw new AppError('Selected funnel stage not found.');
    }

    await this.funnelCardInfoFieldsRepository.delete(funnelCardInfoField);
  }
}

export default DeleteCompanyFunnelCardInfoFieldService;
