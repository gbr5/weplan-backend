import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFunnelStagesRepository from '@modules/suppliers/repositories/IFunnelStagesRepository';

@injectable()
class DeleteFunnelStageService {
  constructor(
    @inject('FunnelStagesRepository')
    private funnelStagesRepository: IFunnelStagesRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const funnelStage = await this.funnelStagesRepository.findById(id);

    if (!funnelStage) {
      throw new AppError('Selected funnel stage not found.');
    }

    await this.funnelStagesRepository.delete(funnelStage);
  }
}

export default DeleteFunnelStageService;
