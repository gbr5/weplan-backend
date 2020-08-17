import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import UserCheckList from '@modules/events/infra/typeorm/entities/UserCheckList';
import IUserCheckListsRepository from '@modules/events/repositories/IUserCheckListsRepository';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
class ListUserCheckListsService {
  constructor(
    @inject('UserCheckListsRepository')
    private selectedSuppliersRepository: IUserCheckListsRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(event_id: string): Promise<UserCheckList[]> {
    const eventSupplier = await this.selectedSuppliersRepository.findByEvent(
      event_id,
    );

    return eventSupplier;
  }
}

export default ListUserCheckListsService;
