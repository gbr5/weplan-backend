import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ISelectedSuppliersRepository from '@modules/events/repositories/ISelectedSuppliersRepository';
import ISelectedSupplierDTO from '@modules/events/dtos/ISelectedSupplierDTO';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListUserSelectedSupplierService {
  constructor(
    @inject('SelectedSuppliersRepository')
    private selectedSuppliersRepository: ISelectedSuppliersRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(event_id: string): Promise<ISelectedSupplierDTO[]> {
    const selectedSuppliers = await this.selectedSuppliersRepository.findByEvent(
      event_id,
    );
    const users = ([] as unknown) as Promise<ISelectedSupplierDTO[]>;

    selectedSuppliers.map(async supplier => {
      (await users).push({
        id: supplier.supplier_id,
        name: supplier.Supplier.name,
        avatar: supplier.Supplier.avatar ? supplier.Supplier.avatar : '',
        trimmed_name: supplier.Supplier.trimmed_name,
      });
    });

    return users;
  }
}

export default ListUserSelectedSupplierService;
