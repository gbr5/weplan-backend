import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventSuppliersRepository from '@modules/events/repositories/IEventSuppliersRepository';
import IEventSupplierDTO from '@modules/events/dtos/ICreateEventSupplierDTO';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListUserEventSupplierService {
  constructor(
    @inject('EventSuppliersRepository')
    private selectedSuppliersRepository: IEventSuppliersRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(event_id: string): Promise<IEventSupplierDTO[]> {
    console.log('1 list event supplier service', event_id);
    const selectedSuppliers = await this.selectedSuppliersRepository.findByEvent(
      event_id,
    );
    console.log('2 list event supplier service', event_id, selectedSuppliers);
    // const users = ([] as unknown) as Promise<IEventSupplierDTO[]>;

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

export default ListUserEventSupplierService;
