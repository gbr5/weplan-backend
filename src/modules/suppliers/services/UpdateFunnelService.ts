import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFunnelsRepository from '@modules/suppliers/repositories/IFunnelsRepository';

import Funnel from '@modules/suppliers/infra/typeorm/entities/Funnel';

@injectable()
class UpdateFunnelService {
  constructor(
    @inject('FunnelsRepository')
    private funnelsRepository: IFunnelsRepository,
  ) {}

  public async execute(name: string, id: string): Promise<Funnel> {
    const funnel = await this.funnelsRepository.findById(id);

    if (!funnel) {
      throw new AppError('Funnel not found.');
    }
    funnel.name = name;

    const updatedFunnel = await this.funnelsRepository.save(funnel);

    return updatedFunnel;
  }
}

export default UpdateFunnelService;
