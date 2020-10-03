import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import IEventSuppliersRepository from '@modules/events/repositories/IEventSuppliersRepository';
import IHiredSupplierDTO from '@modules/events/dtos/IHiredSupplierDTO';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
// import ITransactionAgreementRepository from '@modules/finances/repositories/ITransactionAgreementsRepository';

@injectable()
class ListHiredSuppliersService {
  constructor(
    @inject('EventSuppliersRepository')
    private hiredSuppliersRepository: IEventSuppliersRepository,

    // @inject('TransactionAgreementRepository')
    // private transactionAgreementRepository: ITransactionAgreementRepository,

    @inject('CacheProvider')
    private cacheUser: ICacheProvider,
  ) {}

  public async execute(event_id: string): Promise<IHiredSupplierDTO[]> {
    const hiredSuppliers = await this.hiredSuppliersRepository.findByEventAndIsHired(
      event_id,
    );

    const users = ([] as unknown) as Promise<IHiredSupplierDTO[]>;

    hiredSuppliers.map(async supplier => {
      (await users).push({
        id: supplier.id,
        name: supplier.name,
        transactionAgreement: supplier.transactionAgreement,
      });
    });

    return users;
  }
}

export default ListHiredSuppliersService;
