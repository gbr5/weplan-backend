import WeplanContractOrder from '@modules/weplan/infra/typeorm/entities/WeplanContractOrder';
import ICreateWeplanContractOrderWithProductsDTO from '@modules/weplan/dtos/ICreateWeplanContractOrderWithProductsDTO';

export default interface IWeplanContractOrderRepository {
  create(
    data: ICreateWeplanContractOrderWithProductsDTO,
  ): Promise<WeplanContractOrder>;
  findById(id: string): Promise<WeplanContractOrder | undefined>;
  findByUserId(user_id: string): Promise<WeplanContractOrder[]>;
  findAll(): Promise<WeplanContractOrder[]>;
  save(weplanContractOrder: WeplanContractOrder): Promise<WeplanContractOrder>;
  delete(id: string): Promise<void>;
}
