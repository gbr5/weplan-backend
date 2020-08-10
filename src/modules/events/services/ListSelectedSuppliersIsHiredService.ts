import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import SelectedSupplier from '@modules/events/infra/typeorm/entities/SelectedSupplier';
import ISelectedSuppliersRepository from '@modules/events/repositories/ISelectedSuppliersRepository';
import IFindSelectedSupplierIsHiredDTO from '@modules/events/dtos/IFindSelectedSupplierIsHiredDTO';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListUserSelectedSupplierService {
  constructor(
    @inject('SelectedSuppliersRepository')
    private selectedSuppliersRepository: ISelectedSuppliersRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(
    data: IFindSelectedSupplierIsHiredDTO,
  ): Promise<SelectedSupplier[]> {
    const eventSupplier = await this.selectedSuppliersRepository.findByIdAndEventAndIsHired(
      data,
    );

    return eventSupplier;
  }
}

export default ListUserSelectedSupplierService;
