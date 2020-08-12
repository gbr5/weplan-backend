import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import FunnelType from '@modules/events/infra/typeorm/entities/FunnelType';
import IFunnelTypesRepository from '@modules/events/repositories/IFunnelTypesRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListUserFunnelTypesService {
  constructor(
    @inject('FunnelTypesRepository')
    private funnelTypesRepository: IFunnelTypesRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(): Promise<FunnelType[]> {
    const funnelTypes = await this.funnelTypesRepository.findAll();

    return funnelTypes;
  }
}

export default ListUserFunnelTypesService;
