import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IFunnelTypesRepository from '@modules/suppliers/repositories/IFunnelTypesRepository';

import FunnelType from '@modules/suppliers/infra/typeorm/entities/FunnelType';

interface IRequest {
  name: string;
}
@injectable()
class UpdateFunnelTypesService {
  constructor(
    @inject('FunnelTypesRepository')
    private funnelTypesRepository: IFunnelTypesRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<FunnelType> {
    const funnelType = await this.funnelTypesRepository.findByName(name);

    if (!funnelType) {
      throw new AppError('FunnelTypes not found.');
    }
    funnelType.name = name;

    const updatedFunnelType = await this.funnelTypesRepository.save(funnelType);

    return updatedFunnelType;
  }
}

export default UpdateFunnelTypesService;
