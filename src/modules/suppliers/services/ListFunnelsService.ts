import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import Funnel from '@modules/suppliers/infra/typeorm/entities/Funnel';
import IFunnelsRepository from '@modules/suppliers/repositories/IFunnelsRepository';

@injectable()
class ListUserFunnelsService {
  constructor(
    @inject('FunnelsRepository')
    private funnelsRepository: IFunnelsRepository,
  ) {}

  public async execute(supplier_id: string): Promise<Funnel[]> {
    const funnels = await this.funnelsRepository.findBySupplierId(supplier_id);

    return funnels;
  }
}

export default ListUserFunnelsService;
