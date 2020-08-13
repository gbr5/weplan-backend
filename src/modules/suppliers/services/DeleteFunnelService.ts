import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFunnelsRepository from '@modules/suppliers/repositories/IFunnelsRepository';

@injectable()
class DeleteFunnelService {
  constructor(
    @inject('FunnelsRepository')
    private funnelsRepository: IFunnelsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const funnel = await this.funnelsRepository.findById(id);

    if (!funnel) {
      throw new AppError('Selected supplier not found.');
    }

    await this.funnelsRepository.delete(funnel);
  }
}

export default DeleteFunnelService;
