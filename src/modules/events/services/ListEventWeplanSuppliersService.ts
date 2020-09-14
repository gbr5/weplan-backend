import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventWeplanSuppliersRepository from '@modules/events/repositories/IEventWeplanSuppliersRepository';
import IEventWeplanSupplierDTO from '@modules/events/dtos/ICreateEventWeplanSupplierDTO';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListUserEventWeplanSupplierService {
  constructor(
    @inject('EventWeplanSuppliersRepository')
    private selectedSuppliersRepository: IEventWeplanSuppliersRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(event_id: string): Promise<IEventWeplanSupplierDTO[]> {
    const selectedSuppliers = await this.selectedSuppliersRepository.findByEventId(
      event_id,
    );
    // const users = ([] as unknown) as Promise<IEventWeplanSupplierDTO[]>;

    // selectedSuppliers.map(async supplier => {
    //   (await users).push({
    //     id: supplier.supplier_id,
    //     name: supplier.Supplier.name,
    //     avatar: supplier.Supplier.avatar ? supplier.Supplier.avatar : '',
    //     trimmed_name: supplier.Supplier.trimmed_name,
    //   });
    // });

    return selectedSuppliers;
  }
}

export default ListUserEventWeplanSupplierService;
